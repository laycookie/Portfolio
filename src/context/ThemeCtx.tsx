import { createContext } from "react";

type themeObj = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeCtx = createContext({
  theme: "",
  setTheme: (theme: string) => {},
} as themeObj);
