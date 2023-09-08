import { ReactNode } from "react";
import LayoutBody from "./LayoutBody";
import { cookies } from "next/headers";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }: { children: ReactNode }) {
  function getTheme(): string | undefined {
    const theme = cookies().get("theme")?.value;
    // if there is no theme cookie, we assume the user is using the system theme
    return theme;
  }

  return (
    <LayoutBody initialTheme={getTheme()} font={inter.className}>
      {children}
      <AnalyticsWrapper />
    </LayoutBody>
  );
}
