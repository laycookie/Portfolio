import { createContext } from "react";

export const ThemeContext = createContext(
  {} as {
    theme: "dark" | "light" | "system";
    setTheme: (theme: "dark" | "light" | "system") => void;
  }
);
