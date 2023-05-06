import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import "./globals.css";
import { browser } from "process";

async function setTheme(setTheme: string) {
  "use server";

  await cookies().set("theme", setTheme);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const temp = () => {
    const theme: string | undefined = cookies().get("theme")?.value;

    if (typeof theme === undefined) {
      setTheme("system");
      return "system" as string;
    }

    return theme as string;
  };

  return (
    <html lang="en" className={temp()}>
      <body className="defaults">
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
