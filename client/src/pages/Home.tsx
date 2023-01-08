import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {};

export default function Home({}: Props) {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>test</h1>
    </>
  );
}
