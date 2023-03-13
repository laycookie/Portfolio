import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import SkillGrid from "./SkillGrid";
import WriteInTxt from "@/components/WriteInTxt";
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
      <SideNav>
        <main className="contain">
          <section id="Intro." className="h-[100vh]">
            <h1
              className="font-semibold text-4xl sm:text-6xl md:text-7xl
           text-stroke-2 pt-[max(76px,32vh)]"
            >
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
            <WriteInTxt
              text="I’m a front-end web developer based in California."
              className="h-10 w-full mt-4
           text-2xl font-light
           stroke-1 stroke-black fill-black
            dark:stroke-white dark:fill-white"
            />
          </section>
          <section id="Skills" className="h-[100vh] flex justify-center">
            <SkillGrid />
          </section>
        </main>
      </SideNav>
      <Footer />
    </>
  );
}
