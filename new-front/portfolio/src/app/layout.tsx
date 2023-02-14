"use client";

import { useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);
  return (
    <html lang="en" className={"Defaults " + (isDark ? "dark" : "")}>
      <body>{children}</body>
    </html>
  );
}
