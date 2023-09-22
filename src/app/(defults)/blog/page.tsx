// import InfoCard from "@/components/InfoCard/InfoCard";
// import type {Metadata} from "next";
// import {sql} from "@vercel/postgres";
//
// export const metadata: Metadata = {
//     title: "Blog",
// };
//
// type Props = {
//
// };
//
// export default async function Page({}: Props) {
//     const {rows} = await sql`SELECT * FROM blogs`;
//
//     return (
//         <main className="defaults contain">
//             <h1 className="mt-32 flex justify-center w-full">Blogs</h1>
//             <div className="mt-8">
//                 {rows.map((blog, index) => (
//                     <InfoCard link={blog.link} key={index}>
//                         <InfoCard.Title title={blog.title}/>
//                         <InfoCard.Text text={blog.description}/>
//                         <InfoCard.Footer
//                             text={`Time to read: ~${blog.readtimeinmin} min.`}
//                         />
//                     </InfoCard>
//                 ))}
//             </div>
//         </main>
//     );
// }
