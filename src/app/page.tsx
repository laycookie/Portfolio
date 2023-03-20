import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import SkillGrid from "./SkillGrid";
import EduCard from "./EduCard";
import WriteInTxt from "@/components/WriteInTxt";
import AboutT from "./AboutT";
import TypeIn from "./TypeIn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Hello, my name is Dennis Lonoshchuk, I’m a front-end web developer based in California, and this is my web portfolio.",
  openGraph: {
    title: "Home",
    description:
      "Hello, my name is Dennis Lonoshchuk, I’m a front-end web developer based in California, and this is my web portfolio.",
    url: "https://Lonoshchuk.org",
    siteName: "Dennis Lonoshchuk portfolio",
    images: [
      {
        url: "https://www.lonoshchuk.com/face.jpg",
        width: 686,
        height: 916,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar pageTitle="Home" />
      <SideNav>
        <main className="contain">
          <section id="Intro." className="h-[100vh]">
            <TypeIn />
            <WriteInTxt
              text="I’m a front-end web developer based in California."
              className="h-10 w-full mt-4
              text-lg sm:text-2xl font-light
           stroke-1 stroke-black fill-black
            dark:stroke-white dark:fill-white"
            />
          </section>
          <section id="Skills" className="min-h-[100vh] flex justify-center">
            <SkillGrid />
          </section>
          <section id="About me" className="min-h-[100vh]">
            <div>
              <h2 className="text-5xl pt-36 pb-24 font-bold text-center">
                About me
              </h2>
              <AboutT
                offSet={-50}
                innerClassName={"text-lg pb-12 w-[65%]"}
                text={`Hello there! My name is Dennis Lonoshchuk, and I am a front-end
              web developer based in California. I am passionate about
              creating beautiful, responsive, and user-friendly websites that
              help businesses and individuals achieve their goals.`}
              />
              <AboutT
                offSet={50}
                outerClassName={"w-full flex justify-end"}
                innerClassName={"text-lg pb-12 w-[65%]"}
                text={`Hello there! My name is Dennis Lonoshchuk, and I am a front-end
              web developer based in California. I am passionate about
              creating beautiful, responsive, and user-friendly websites that
              help businesses and individuals achieve their goals.`}
              />

              <AboutT
                offSet={-50}
                innerClassName={"text-lg pb-12 w-[65%]"}
                text={`Tools I have experimented with includes React, Tailwind,
                Three.js, Pixi.js, Websocket, and other front-end technologies.
                I have experience working with a variety of content management
                systems (CMS) such as WordPress, Shopify, and Squarespace. I
                also have a good understanding of back-end technologies such as
                Node.js, Express, and MongoDB.`}
              />
            </div>
          </section>
          <section id="Edu." className="min-h-[100vh] flex justify-center">
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
