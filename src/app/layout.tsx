import LayoutBody from "./LayoutBody";
import { cookies } from "next/headers";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import "./globals.css";

async function setCookieTheme(setTheme: string) {
  "use server";

  await cookies().set("theme", setTheme);
}

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
    <LayoutBody initialTheme={getTheme()} setCookieTheme={setCookieTheme}>
      {children}
      <AnalyticsWrapper />
    </LayoutBody>
  );
}
