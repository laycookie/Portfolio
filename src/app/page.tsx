import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <main className="contain">
        <section className="h-[100vh]">
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
        <section>
          {/* WARNING REFACTOR BEFORE PUSHING TO MAIN */}
          <div className="">
            <div
              className="grid grid-cols-2 grid-rows-4
           "
            >
              <h2 className="border-2">Familiar technologies</h2>
              <h2 className="border-2">Fun demos</h2>

              <div className="flex py-4 border-2">
                <h3 className="w-32 my-auto">Lang.</h3>
                <div className="pl-32 my-auto">
                  <p>Python</p>
                  <p>Node </p>
                  <p>C</p>
                  <p>C# </p>
                  <p>JavaScript</p>
                  <p>Typescript</p>
                </div>
              </div>
              <div className="row-span-3 py-4 border-2"></div>
              <div className="border-2">
                <div className="flex py-4">
                  <h3 className="w-32 my-auto">Front-end</h3>
                  <div className="pl-32 my-auto">
                    <p>React</p>
                    <p>Three.js</p>
                    <p>TailwindCSS</p>
                  </div>
                </div>
                <div className="flex py-4">
                  <h3 className="w-32 my-auto">Back-end</h3>
                  <div className="pl-32 my-auto">
                    <p>Express</p>
                    <p>Flask</p>
                  </div>
                </div>
              </div>
              <div className="flex py-4 border-2">
                <h3 className="w-32 my-auto">Misc</h3>
                <div className="pl-32 my-auto">
                  <p>Prisma</p>
                  <p>SQL</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
