import LayoutBody from "./LayoutBody";
import { cookies } from "next/headers";
import {  } from "next/font";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  applicationName: "Dennis Lonoshchuk Portfolio",
  authors: [
    {
      name: "Dennis Lonoshchuk",
      url: "https://lonoshchuk.com/",
    },
  ],
  creator: "Dennis Lonoshchuk",
  generator: "Next.js",
  keywords: ["Portfolio", "Dennis", "Lonoshchuk"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function getTheme(): string | undefined {
    const theme = cookies().get("theme")?.value;
    // if there is no theme cookie, we assume the user is using the system theme
    return theme;
  }

  return (
    <LayoutBody initialTheme={getTheme()}>
      {children}
      <AnalyticsWrapper />
    </LayoutBody>
  );
}
