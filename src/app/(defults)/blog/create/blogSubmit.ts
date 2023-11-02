import memberstackDOM from "@memberstack/dom";
import {serverSideBlogSubmit} from "@/app/(defults)/blog/create/serverSideBlogSubmit";
import {Content} from "@/types/blog";
import process from "process";

export function publishBlog({email, password}: {
    email: string,
    password: string
}, content: Content[], blogContentData: FormData) {
    const tokenTurnstile = blogContentData.get("cf-turnstile-response") as string | undefined;
    const memberstackPublicKey = process.env?.MEMBERSTACK_PUBLIC_KEY;
    if (!memberstackPublicKey) throw new Error("MEMBERSTACK_PUBLIC_KEY is not defined");
    const memberstack = memberstackDOM.init({
        publicKey: memberstackPublicKey,
    });
    memberstack.loginMemberEmailPassword({
        email: email,
        password: password
    }).then((res) => {

        for (const i in content) {
            const data = content[i];
            if (data === null) continue;
            else if (typeof data === "string") blogContentData.append("text", data);
            else if (data.file) blogContentData.append("image", new Blob([data.file], {type: data.file.type}), data.name ? data.name : "image");
        }
        if (!tokenTurnstile) {
            console.error("tokenTurnstile is null");
            return;
        }
        serverSideBlogSubmit(res.data.tokens.accessToken, blogContentData, tokenTurnstile).then(res => {
            console.log(res)
        });
    }).catch((error) => {
        console.log(error)
    });
}
