import LayoutBody from "./LayoutBody";
import { cookies } from "next/headers";
import { setCookieTheme } from "@/components/setCookieTheme";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      {children}
      <AnalyticsWrapper />
    </LayoutBody>
  );
}
