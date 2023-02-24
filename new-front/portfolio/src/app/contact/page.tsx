import React from "react";
import Navbar from "components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hello, my name is Dennis Lonoshchuk, I’m a front-end web developer based in California, and in here you can view of my contact information.",
};

type Props = {};

export default function page({}: Props) {
  return (
    <main className="defaults">
      <Navbar pageTitle="Contact" />
    </main>
  );
}
