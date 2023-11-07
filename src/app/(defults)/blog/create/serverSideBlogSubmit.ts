"use server"
import {headers} from 'next/headers'
import memberstackAdmin from "@memberstack/admin";
import {S3Client, PutObjectCommand, HeadObjectCommand} from "@aws-sdk/client-s3";
import {sql} from "@vercel/postgres";
import readingTime from "reading-time";
import * as process from "process";
import {blogContentData} from "@/types/blog.d";

export async function serverSideBlogSubmit(token: string, blogContentData: FormData, tokenTurnstile: string) {
    // verify env variables
    const cloudflareR2AccountId = process.env?.CLOUDFLARE_R2_ACCOUNT_ID;
    const cloudflareAccessKeyID = process.env?.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const cloudflareSecretKey = process.env?.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const cloudflareTurnstileSecretKey = process.env?.CLOUDFLARE_TURNSTILE_SECRET_KEY
    if (!cloudflareR2AccountId) throw new Error("CLOUDFLARE_R2_ACCOUNT_ID is not defined");
    if (!cloudflareAccessKeyID) throw new Error("ACCESS_KEY_ID is not defined");
    if (!cloudflareSecretKey) throw new Error("SECRET_ACCESS_KEY is not defined");
    if (!cloudflareTurnstileSecretKey) throw new Error("CLOUDFLARE_TURNSTILE_SECRET_KEY is not defined");

    // check turnstile token
    let turnStileFormData = new FormData();
    turnStileFormData.append("secret", cloudflareTurnstileSecretKey);
    turnStileFormData.append("response", tokenTurnstile);
    turnStileFormData.append('idempotency_key', crypto.randomUUID());
    // TODO: This should be tested to see if it works
    console.log(headers().get("CF-Connecting-IP"))
    turnStileFormData.append('remoteip', headers().get("CF-Connecting-IP") as string);
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const firstResult = await fetch(url, {
        body: turnStileFormData,
        method: 'POST',
    });
    const firstOutcome = await firstResult.json();
    if (firstOutcome.success === false) return 400; // bad request incorrect captcha

    // connect to memberstack and verify that user can post blogs
    if (!process.env?.MEMBERSTACK_SECRETE) throw new Error("MEMBERSTACK_SECRETE is not defined");
    const memberstack = memberstackAdmin.init(process.env?.MEMBERSTACK_SECRETE);
    const userData = await memberstack.verifyToken({token});
    const permittedUsers = ["mem_sb_clntt5yak02ep0s2ma1lyawxi"]
    if (!permittedUsers.includes(userData.id)) return 403; // user is not permitted to post blogs
    // connect to Cloudflare R2
    const S3 = new S3Client({
        region: "auto",
        endpoint: `https://${cloudflareR2AccountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: cloudflareAccessKeyID,
            secretAccessKey: cloudflareSecretKey,
        },
    });

    // prepare data to be sent to sql database
    // =======================FILTER FormData HERE=========================
    const contentsOfBlog: blogContentData[] = []
    for (const [key, value] of blogContentData.entries()) {
        switch (key) {
            case "title":
            case "description":
            case "text":
                contentsOfBlog.push({name: key, value: value as string})
                break;
            case "image":
                let imageKey = generateIdempotencyKey();

                // check if image key already exists
                for (let i = 0; (await doesKeyExists(imageKey)); i++) {
                    if (i > 2) return 500; // internal server error
                    imageKey = generateIdempotencyKey();
                    console.warn("key already exists")
                }

            async function doesKeyExists(key: string) {
                try {
                    await S3.send(new HeadObjectCommand({
                        Bucket: "blog-images",
                        Key: key,
                    }))
                    return true;
                } catch {
                    return false;
                }
            }

                const log = await S3.send(new PutObjectCommand({
                    Bucket: "blog-images",
                    Key: imageKey,
                    Body: await fileToBuffer(value as File),
                    ContentType: (value as File).type,
                }))
                if (log.$metadata.httpStatusCode !== 200) return 500; // internal server error

                console.log(imageKey)
                contentsOfBlog.push({name: key, value: imageKey})
                break;
        }
    }
    console.log(contentsOfBlog)

    // send the blog to be stored in the sql database
    const title = contentsOfBlog.filter((value) => value.name === "title").map((value) => value.value).join(" ")
    const description = contentsOfBlog.filter((value) => value.name === "description").map((value) => value.value).join(" ")
    const readTimeInMin = readingTime(contentsOfBlog.filter((value) => value.name === "text").map((value) => value.value).join(" ")).minutes
    const link = title.toLowerCase().replaceAll(" ", "-").replaceAll(/[^\w-]+/g, "")
    sql`INSERT INTO blogs (title, description, blogcontents, readtimemin, link) VALUES (${title}, ${description}, ${JSON.stringify(contentsOfBlog)}, ${readTimeInMin}, ${link})`
    return 200;
}

async function fileToBuffer(file: File): Promise<Buffer> {
    return Buffer.from(await file.arrayBuffer())
}

function generateIdempotencyKey(): string {
    return crypto.randomUUID();
}