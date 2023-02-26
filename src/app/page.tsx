import type { Metadata } from "next";
import Navbar from "components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Hello, my name is Dennis Lonoshchuk, I’m a front-end web developer based in California, and this is my web portfolio.",
};

export default function Home() {
  return (
    <>
      <Navbar pageTitle="Home" />
      <main className="container mx-auto px-4 ">
        <h1 className="font-semibold text-7xl text-stroke-2 pt-[20vh]">
          Hello, my name is{" "}
          <Link
            href="/contact"
            className="text-transparent dark:text-stroke-white text-stroke-black text-stroke-2
            dark:hover:text-white hover:text-black
          transition-all ease-in-out duration-300"
          >
            Dennis Lonoshchuk
          </Link>
        </h1>
        <p className="text-lg pt-4 ">
          I’m a front-end web developer based in California.
        </p>
      </main>
    </>
  );
}
