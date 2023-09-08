import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = {};

export default function page({}: Props) {
  return (
    <main className="defaults">
      <main className="defaults">
        <h1 className="mt-32 flex justify-center w-full">Blogs</h1>
      </main>
    </main>
  );
}
