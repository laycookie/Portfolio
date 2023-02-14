import React from "react";
import Navbar from "components/Navbar";

type Props = {};

export default async function page({}: Props) {
  return (
    <div>
      <Navbar pageTitle="Portfolio" />
    </div>
  );
}
