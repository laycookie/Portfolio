"use client";

import { useState, ReactNode } from "react";
import { ThemeCtx } from "@/context/ThemeCtx";
import { setCookieTheme } from "@/components/setCookieTheme";

type Props = {
  children: ReactNode;
  initialTheme: string | undefined;
  font: string;
};

export default function LayoutBody({ children, initialTheme, font }: Props) {
  // theming engine
  const [theme, setTheme] = useState<string>(initialTheme ?? "dark");
  function setThemeEverywhere(value: string) {
    setTheme(value);
    setCookieTheme(value);
  }

  return (
    <ThemeCtx.Provider
      value={{
        theme: theme,
        setTheme: setThemeEverywhere,
      }}
    >
      <html lang="en" className={theme + " scroll-smooth " + font}>
        {children}
      </html>
    </ThemeCtx.Provider>
  );
}
