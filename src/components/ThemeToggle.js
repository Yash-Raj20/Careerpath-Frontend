import { LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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
