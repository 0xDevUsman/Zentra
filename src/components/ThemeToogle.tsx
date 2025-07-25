"use client";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
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
