"use client";

import { useThemeContext } from "@/context/ThemeContext";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      className="h-10 w-10 text-xs bg-neutral-950 cursor-pointer dark:bg-neutral-950 text-white dark:text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      {isDarkMode ? (
        <FaSun className="text-lg" />
      ) : (
        <FaMoon className="text-lg" />
      )}
    </button>
  );
}
