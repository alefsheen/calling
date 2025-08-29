/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IRANSansX", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        ultraLight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        demiBold: "600",
        bold: "700",
        extraBold: "800",
        black: "900",
        extraBlack: "950",
        heavy: "1000",
      },
    },
  },
  plugins: [],
};
