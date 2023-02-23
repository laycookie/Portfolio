import React from "react";
import Navbar from "components/Navbar";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="defaults">
      <Navbar pageTitle="Blog" />
    </main>
  );
}
