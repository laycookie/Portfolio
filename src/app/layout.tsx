"use client";

import { getCookie, setCookie } from "cookies-next";
import { useState } from "react";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import { ThemeContext } from "@/context/ThemeContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeValue] = useState<"dark" | "light" | "system">(() => {
    // sets the theme to dark or light
    const initialTheme = () => {
      const themeC =
        typeof window !== "undefined" ? getCookie("theme") : getCookie("theme");

      if (themeC === "dark") {
        return "dark";
      } else if (themeC === "light") {
        return "light";
      } else if (themeC === "system") {
        return "system";
      }
      setCookie("theme", "system");
      return "dark"; // due to the fact that cookies are not yet properly supported in Safari on next.js this will be the default theme
    };
    const val = initialTheme();
    return val;
  });

  function setTheme(theme: "dark" | "light" | "system") {
    setThemeValue(theme);
    setCookie("theme", theme);
  }

  function classTheme() {
    switch (theme) {
      case "light":
        return "";
      case "dark":
        return "dark";
      case "system":
        return "system";
      default:
        return "";
    }
  }

  return (
    <html lang="en" className={classTheme()}>
      <body className="defaults">
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
