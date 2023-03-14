import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import SkillGrid from "./SkillGrid";
import EduCard from "./EduCard";
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
              <EduCard
                title="CS50X Certificate"
                description="CS50x is a self-paced online computer science course that
                  covers a wide range of topics, including algorithms, data
                  structures, internet technologies, and more."
                certID="Certificate ID: 218d13be-02e7-4a50-81da-355c991e4609"
                link="https://certificates.cs50.io/218d13be-02e7-4a50-81da-355c991e4609.pdf?size=letter"
              />
              <EduCard
                title="AP computer science"
                description="AP Computer Science is a college-level course that covers fundamentals of computer science; Course uses Java programming language and involves the development of a variety of programs to solve problems."
              />
            </div>
          </section>
        </main>
      </SideNav>
      <Footer />
    </>
  );
}
