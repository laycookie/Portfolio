import { createContext } from "react";

type themeObj = {
  isDark: boolean | null;
  setIsDark: (isDark: boolean) => void;
};

export const ThemeContext = createContext({
  isDark: false,
  setIsDark: (isDark: boolean) => {},
} as themeObj);
