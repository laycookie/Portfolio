import styles from "@/styles/blogStyles.module.css";
import {sql} from "@vercel/postgres";
import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import {blogContent, blogContentData} from "@/types/blog";
import DisplayImage from "@/app/(defults)/blog/[blogViewer]/DisplayImage";
import process from "process";

type props = {
    params: { blogViewer: string };
};

async function fetchBlogContent(link: string) {
    const {rows} = await sql`SELECT * FROM blogs WHERE link = ${link}`;
    return rows;
}

async function fetchImageFromS3(key: string) {
    "use server"
    const cloudflareR2AccountId = process.env?.CLOUDFLARE_R2_ACCOUNT_ID;
    const cloudflareAccessKeyID = process.env?.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const cloudflareSecretKey = process.env?.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    if (!cloudflareR2AccountId || !cloudflareAccessKeyID || !cloudflareSecretKey) {
        throw new Error("Cloudflare R2 Account ID, Access Key ID, or Secret Key is missing.");
    }

    const S3 = new S3Client({
        region: "auto",
        endpoint: `https://${cloudflareR2AccountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: cloudflareAccessKeyID,
            secretAccessKey: cloudflareSecretKey,
        },
    });

    return await S3.send(new GetObjectCommand({
        Bucket: "blog-images",
        Key: key,
    }));

}

export default async function Page({params}: props) {
    const data = (await fetchBlogContent(params.blogViewer))[0] as blogContent;

    return (
        <main className="defaults contain">
            {data ? (
                    <>
                        <h1 className={"mt-32 mb-2 " + styles.title}>{data.title}</h1>
                        <h2 className={"mb-4 " + styles.description}>{data.description}</h2>
                        {(JSON.parse(data.blogcontents) as blogContentData[]).map(async (blogElement, index) => {
                            switch (blogElement.name) {
                                case "text":
                                    return <p key={index}>{blogElement.value}</p>;
                                case "image":
                                    const req = await fetchImageFromS3(blogElement.value);
                                    const rawImage = await req.Body?.transformToByteArray();
                                    const imageType = req.ContentType;
                                    if (!rawImage || !imageType) {
                                        throw new Error("Image is empty.");
                                    }
                                    return <DisplayImage rawImage={rawImage} imageType={imageType}/>;
                            }
                        })
                        }
                    </>) :
                <h1 className={"mt-32 mb-2 w-full text-center " + styles.title}>Error 404: Blog not found</h1>
            }
        </main>
    );
}
