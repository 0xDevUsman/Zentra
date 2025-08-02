import tailwindScrollbarHide from "tailwind-scrollbar-hide";

const config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    },
  },
  plugins: [tailwindScrollbarHide],
};

export default config;
