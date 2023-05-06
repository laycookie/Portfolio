"use client";

import { useState } from "react";
import { ThemeCtx } from "@/context/ThemeCtx";

type Props = {
  children: React.ReactNode;
  initialTheme: string;
  setCookieTheme: (setTheme: string) => Promise<void> | void;
};

export default function LayoutBody({
  children,
  initialTheme,
  setCookieTheme,
}: Props) {
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
      <html lang="en" className={theme}>
        <body className="defaults">{children}</body>
      </html>
    </ThemeCtx.Provider>
  );
}
