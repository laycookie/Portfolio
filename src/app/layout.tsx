"use client";

import { useEffect, useState } from "react";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import { ThemeContext } from "@/context/ThemeContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<string | (() => string)>(() => {
    // sets the theme to dark or light
    const initialTheme: () => string = () => {
      const themeL = localStorage.getItem("theme");
      if (themeL === "dark") {
        return "dark";
      } else if (themeL === "light") {
        return "light";
      } else {
        localStorage.setItem("theme", "system");
        // check if the user has os set to dark mode if no theme was chosen before
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        } else {
          return "light";
        }
      }
    };
    return initialTheme();
  });

  /*
  before:
  useEffect(() => {
    const themeL = localStorage.getItem("theme");
    if (themeL === "dark") {
      setTheme("dark");
    } else if (themeL === "light") {
      setTheme("light");
    } else if (themeL === "system") {
      // check if the user has os set to dark mode if no theme was chosen before
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
        localStorage.setItem("theme", "dark");
      } else {
        setTheme("light");
        localStorage.setItem("theme", "light");
      }
    }
  }, []);
  */

  return (
    <html
      lang="en"
      className={(theme === "dark" ? "dark" : "") + " scroll-smooth js"}
    >
      <body className="defaults">
        <ThemeContext.Provider value={{ theme, setTheme }}>
          {children}
        </ThemeContext.Provider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
