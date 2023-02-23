import React from "react";
import Navbar from "components/Navbar";

type Props = {};

export default async function page({}: Props) {
  return (
    <main className="defaults">
      <Navbar pageTitle="Portfolio" />
      <h1>Portfolio</h1>
    </main>
  );
}
