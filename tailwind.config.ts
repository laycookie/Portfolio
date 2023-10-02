import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",

        "dark-main": "#111",
        "dark-secondary": "#202020",
        "dark-tertiary": "#0A0A0A",

        main: "#EBEBEB",
        secondary: "#FFFFFF",
        tertiary: "#E5E5E5",
      },
      opacity: {
        glass: "0.25",
      },
    },
  },
  plugins: [
    ({ addVariant }: any) => {
      addVariant("child", "& > *");
    },
  ],
} satisfies Config;
