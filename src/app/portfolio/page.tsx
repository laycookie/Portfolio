import React from "react";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Hello, my name is Dennis Lonoshchuk, I’m a front-end web developer based in California, and in here you can view some of my projects.",
};

type Props = {};

export default async function page({}: Props) {
  return (
    <main className="defaults">
      <Navbar pageTitle="Portfolio" />
      <h1>Portfolio</h1>
    </main>
  );
}
