/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        translate: {
          "0%": { transform: "translateX(-19%)" },
          "100%": { transform: "translateX(-76%)" },
        },
      },
      animation: {
        translate: "translate 100s linear infinite",
      },
    },
  },
  plugins: [],
};
