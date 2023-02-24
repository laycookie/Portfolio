import type { Metadata } from "next";
import Navbar from "components/Navbar";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Hello, my name is Dennis Lonoshchuk, I’m a front-end web developer based in California, and this is my web portfolio.",
};

export default function Home() {
  return (
    <main className="defaults">
      <Navbar pageTitle="Home" />
      <h1>Hello, my name is Dennis Lonoshchuk</h1>
      <p>I’m a front-end web developer based in California.</p>
    </main>
  );
}
