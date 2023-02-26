"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState<boolean | null>(null);
  // sets the theme to dark or light
  useLayoutEffect(() => {
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
    <html lang="en" className={isDark ? "dark" : ""}>
      <body className="defaults">{children}</body>
    </html>
  );
}
