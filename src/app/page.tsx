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
          <section id="About me" className="h-[100vh] flex">
            <h1>Test</h1>
          </section>
          <section id="Edu." className="h-[100vh] flex justify-center">
            <div className="my-16">
              <h3 className="text-5xl text-center mb-16 font-bold">
                My coding related education
              </h3>
              <div
                className="rounded-xl p-8"
                style={{
                  boxShadow:
                    "-4px -4px 4px #2D2A32, 0px 40px 60px -17px #141316, inset -2px -2px 4px rgba(0, 0, 0, 0.25), inset 4px 4px 8px rgba(0, 0, 0, 0.25)",
                }}
              >
                <h4 className="mb-4 text-3xl font-semibold">
                  CS50X Certificate
                </h4>
                <h5 className="mb-2 text-xl">
                  CS50x is a self-paced online computer science course that
                  covers a wide range of topics, including algorithms, data
                  structures, internet technologies, and more.
                </h5>
                <p className="text-sm">
                  Certificate ID: 218d13be-02e7-4a50-81da-355c991e4609
                </p>
              </div>
            </div>
          </section>
        </main>
      </SideNav>
      <Footer />
    </>
  );
}
