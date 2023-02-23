/** @type {import('tailwindcss').Config} */
module.exports = {
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

        "dark-main": "#28252C",
        "dark-secondary": "#232127",
        "dark-tertiary": "#19171C",

        main: "#FFFFFF",
        secondary: "#FFFFFF",
        tertiary: "#EBEBEB",
      },
      opacity: {
        glass: 0.25,
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "& > *");
    },
  ],
};
