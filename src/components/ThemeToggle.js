import React, { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    else return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 border border-gray-300 hover:border-gray-500 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <LuSun size={22} className="text-yellow-400" />
      ) : (
        <LuMoon size={22} className="text-gray-800 dark:text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
