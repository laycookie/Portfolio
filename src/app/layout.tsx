"use client";

import { ThemeProvider } from "next-themes";
import { AnalyticsWrapper } from "@/components/AnalyticsWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="defaults">
        <ThemeProvider defaultTheme="system" attribute="class">
          {children}
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
