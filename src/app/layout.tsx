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
  // type themeObj = {
  //   isDark: boolean | null;
  //   setIsDark: (isDark: boolean) => void;
  // };
  // const ThemeContext = createContext({
  //   isDark: false,
  //   setIsDark: (isDark: boolean) => {},
  // } as themeObj);
  // const ThemeContext = useContext(ThemeContext)

  const [isDark, setIsDark] = useState<boolean | null>(null);
  // sets the theme to dark or light
  useEffect(() => {
    const isDarkL = localStorage.getItem("isDark");
    if (isDarkL === "true") {
      setIsDark(true);
    } else if (isDarkL === "false") {
      setIsDark(false);
    } else if (isDarkL === null) {
      // check if the user has os set to dark mode if no theme was chosen before
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDark(true);
        localStorage.setItem("isDark", "true");
      } else {
        setIsDark(false);
        localStorage.setItem("isDark", "false");
      }
    }
  }, []);

  return (
    <html lang="en" className={(isDark ? "dark" : "") + " scroll-smooth"}>
      <body className="defaults">
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
          {children}
        </ThemeContext.Provider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
