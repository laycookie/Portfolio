import CallForm from "./CallForm";
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
      <main className="contain pt-[max(76px,20vh)]">
        <h1>Contact information</h1>
        <div
          className="text-lg sm:text-xl md:text-2xl
        mt-4 sm:mt-8 md:mt-10"
        >
          <h2>Email: dennis@lonoshchuk.com</h2>
          <h2>Phone: +1(747)273-9768</h2>
          <h2>Discord: LAYTORT#0325</h2>
        </div>
        <h3
          className="sm:text-lg md:text-xl font-light
        mt-1 sm:mt-2 md:mt-4"
        >
          If you want to quickly fire me a message here is a <CallForm /> you
          can fill out.
        </h3>
      </main>
    </>
  );
}
