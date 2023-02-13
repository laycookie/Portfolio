import React from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";

type Props = { title: string };

export default function Contact({ title }: Props) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Navbar pageTitle={title} />
      <h1>test</h1>
    </>
  );
}
