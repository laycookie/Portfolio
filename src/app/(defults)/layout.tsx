import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "This website is a portfolio created by Dennis Lonoshchuk.",
  themeColor: "#000000",
  openGraph: {
    title: "Dennis Lonoshchuk Portfolio",
    description: "This website is a portfolio created by Dennis Lonoshchuk.",
    url: "https://lonoshchuk.com/",
    type: "website",
    images: [
      {
        url: "https://lonoshchuk.com/images/preview.png",
        width: 1200,
        height: 627,
        alt: "Dennis Lonoshchuk Portfolio",
      },
    ],
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={"defaults"}>
      <Navbar />
      {children}
      <Footer />
    </body>
  );
}
