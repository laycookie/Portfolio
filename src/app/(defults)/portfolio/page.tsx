import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
};

type Props = {};

export default async function page({}: Props) {
  return (
    <main className="defaults">
      <h1 className="mt-32 flex justify-center w-full">Portfolio</h1>
    </main>
  );
}
