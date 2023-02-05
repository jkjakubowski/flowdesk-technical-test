/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      current: "currentColor",
      purple: "#5c2cd9",
      pink: "#b053ab",
      green: "#68b193",
      gray: "#515151",
      text_gray: "#cccccc",
      red: "#F08080",
      ticker_green: "#008000",
    },
    fontFamily: {
      sans: ["alliance", "sans-serif"],
    },
  },
  mode: "jit",
  plugins: [],
};
