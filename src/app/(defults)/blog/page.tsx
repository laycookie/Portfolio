import InfoCard from "@/components/InfoCard/InfoCard";
import type {Metadata} from "next";
import {sql} from "@vercel/postgres";

export const metadata: Metadata = {
    title: "Blog",
};

type Props = {};

async function getListOfBlogs() {
    try {
    const {rows} = await sql`SELECT * FROM blogs`;
    return rows;
    } catch {
        return null;
    }
}

export default async function Page({}: Props) {
    const rows = await getListOfBlogs();

    return (
        <main className="defaults contain">
            <h1 className="mt-32 flex justify-center w-full">Blogs</h1>
            <div className="mt-8">
                {rows ? rows.map((blog, index) => (
                    <InfoCard link={"./blog/"+blog.link} key={index}>
                        <InfoCard.Title title={blog.title}/>
                        <InfoCard.Text text={blog.description}/>
                        <InfoCard.Footer
                            text={`Time to read: ~${blog.readtimemin} min.`}
                        />
                    </InfoCard>
                )): <p>Connection error try again later</p>}
            </div>
        </main>
    );
}
