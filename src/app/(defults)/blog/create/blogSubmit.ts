import memberstackDOM from "@memberstack/dom";
import {serverSideBlogSubmit} from "@/app/(defults)/blog/create/serverSideBlogSubmit";
import {Content} from "@/types/blog";

export function publishBlog({email, password}: { email: string, password: string }, content: Content[]) {
    const memberstack = memberstackDOM.init({
        publicKey: "pk_sb_cb0e919e87f946f4bb26",
    });
    memberstack.loginMemberEmailPassword({
        email: email,
        password: password
    }).then((res) => {
        const dataToServer = new FormData();
        for (const i in content) {
            const data = content[i]
            if (data === null) continue;
            else if (typeof data === "string") dataToServer.append("content", data);
            else if (data.file) dataToServer.append(i, new Blob([data.file], {type: "image/*"}), data.name ? data.name : "image");
        }
        serverSideBlogSubmit(res.data.tokens.accessToken, dataToServer).then();
    }).catch((error) => {
        console.log(error)
    });
}
