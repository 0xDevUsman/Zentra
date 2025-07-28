// tailwind.config.ts or .js
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

const config = {
  darkMode: "class", // <-- required for next-themes
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add custom theme extensions here if needed
    },
  },
  plugins: [tailwindScrollbarHide],
};

export default config;
