import React from "react";
import Navbar from "@/components/Navbar";
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
      <main className="contain">
        <h1 className="mt-[max(76px,15vh)]">Ways to contact me</h1>
        <div>
          <h2>Email: Dennis@Lonoshchuk.com</h2>
          <h2>Phone: +1(747)273-9768</h2>
          <h2>Discord: LAYTORT#0325</h2>
        </div>
        <h1>Feel free to quickly ask me a question here!</h1>
        <form action="">
          <input
            type="text"
            placeholder="First and last name"
            className="input-field"
          />
          <input type="text" placeholder="Email" className="input-field" />
          <div>
            <input type="text" placeholder="Subject" className="input-field" />
            <textarea
              name="Contents"
              id="Contents"
              className="input-field block"
            ></textarea>

            <button type="submit">Send</button>
          </div>
        </form>
        <p>
          *Contact form is still in development and doesn{"'"}t work currently
        </p>
      </main>
    </>
  );
}
