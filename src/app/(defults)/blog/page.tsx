import BlogPrev from "./BlogPrev";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = {};

export default function page({}: Props) {
  return (
    <main className="defaults contain">
      <h1 className="mt-32 flex justify-center w-full">Blogs</h1>
      <div className="mt-8">
        <BlogPrev />
      </div>
    </main>
  );
}
