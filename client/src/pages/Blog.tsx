import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {};

export default function Blog({}: Props) {
  return (<>
        <Helmet>
        <title>Blog</title>
      </Helmet>
      <h1>Blog</h1>
      </>);
}
