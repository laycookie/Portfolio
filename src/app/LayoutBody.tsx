"use client";

import { useState } from "react";
import { ThemeCtx } from "@/context/ThemeCtx";
import { setCookieTheme } from "@/components/setCookieTheme";

type Props = {
  children: React.ReactNode;
  initialTheme: string;
};

export default function LayoutBody({ children, initialTheme }: Props) {
  const [theme, setTheme] = useState<string>(initialTheme);

  function setThemeUniversally(value: string) {
    setTheme(value);
    setCookieTheme(value);
  }

  return (
    <ThemeCtx.Provider
      value={{
        theme: theme,
        setTheme: setThemeUniversally,
      }}
    >
      <html lang="en" className={theme + " scroll-smooth"}>
        <body className="defaults">{children}</body>
      </html>
    </ThemeCtx.Provider>
  );
}
