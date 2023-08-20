import LayoutBody from "./LayoutBody";
import { cookies } from "next/headers";
import { setCookieTheme } from "@/components/setCookieTheme";
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
  function getTheme(): string {
    const theme = cookies().get("theme")?.value;
    if (!theme) {
      setCookieTheme("system");
      return "system";
    }
    return theme;
  }

  return (
    <LayoutBody initialTheme={getTheme()}>
      {children}
      <AnalyticsWrapper />
    </LayoutBody>
  );
}
