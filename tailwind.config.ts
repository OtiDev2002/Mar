import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#FFF5F7",
          100: "#FFECF0",
          200: "#FFD6E0",
          300: "#FFBDCF",
          400: "#FF8FAF",
          500: "#FF6B8A",
          600: "#E84575",
          700: "#C9325E",
          800: "#A12049",
          900: "#7D1A3C",
        },
      },
      fontFamily: {
        script: ["'Dancing Script'", "cursive"],
        sans: ["'Poppins'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.8)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
