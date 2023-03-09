import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hello, my name is Dennis Lonoshchuk, I’m a front-end web developer based in California, and in here you can view of my contact information.",
};

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <Navbar pageTitle="Contact" />
      <main className="contain pt-[max(76px,20vh)]">
        <h1 className="font-semibold text-4xl sm:text-6xl md:text-7xl">
          Contact information
        </h1>
        <div
          className="text-lg sm:text-xl md:text-2xl
        mt-4 sm:mt-8 md:mt-10"
        >
          <h2>Email: Dennis@Lonoshchuk.com</h2>
          <h2>Phone: +1(747)273-9768</h2>
          <h2>Discord: LAYTORT#0325</h2>
        </div>
        <h3
          className="sm:text-lg md:text-xl font-light
        mt-1 sm:mt-2 md:mt-4"
        >
          If you want to quickly fire me a message here is a{" "}
          <Link
            href="/contact"
            className="font-semibold
          dark:text-gray-300 dark:hover:text-white
          text-gray-700 hover:text-black
          transition-all ease-in-out duration-200"
          >
            form
          </Link>{" "}
          you can fill out.
        </h3>
      </main>
      <Footer />
    </>
  );
}