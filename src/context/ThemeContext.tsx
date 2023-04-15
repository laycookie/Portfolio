import { createContext } from "react";

type themeObj = {
  theme: string | (() => string);
  setTheme: (isDark: string) => void;
};

export const ThemeContext = createContext({
  theme: "light",
  setTheme: (isDark: string) => {},
} as themeObj);
