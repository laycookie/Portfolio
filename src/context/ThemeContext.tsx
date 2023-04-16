import { createContext } from "react";

export const ThemeContext = createContext(
  {} as {
    theme: string | (() => string);
    setTheme: (theme: string) => void;
  }
);
