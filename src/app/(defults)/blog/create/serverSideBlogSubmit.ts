"use server"
import memberstackAdmin from "@memberstack/admin";
import * as process from "process";
export async function serverSideBlogSubmit(token: string, content: FormData) {
    if (!process.env?.MEMBERSTACK_SECRETE) throw new Error("MEMBERSTACK_SECRETE is not defined");
    const memberstack = memberstackAdmin.init(process.env?.MEMBERSTACK_SECRETE);
    const userData = await memberstack.verifyToken({token});
    const permittedUsers = ["mem_sb_clntt5yak02ep0s2ma1lyawxi"]
    if (!permittedUsers.includes(userData.id)) return
    for (const value of content.values()){
        console.log(value);
    }
}
