import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiMenu2Fill, RiCloseLargeFill } from "react-icons/ri";
import {
  LuLayoutDashboard,
  LuSquareUserRound,
  LuMessagesSquare,
  LuGraduationCap,
  LuFileText,
} from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbMenu4 } from "react-icons/tb";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import GearIcon from "../assets/Gear.png";
const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { user, logout } = useContext(AuthContext);
  const Navigate = useNavigate();

  const links = [
    { label: "Chat", to: "/chat" },
    { label: "Roadmap", to: "/roadmap" },
    { label: "Courses", to: "/courses" },
    { label: "Interview", to: "/interview" },
    { label: "Mock Interview", to: "/mockinterview" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // 🔄 Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 py-3 flex justify-between items-center relative">
        <Link
          to="/chat"
          className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-500 shadow-md">
            <img
              src={GearIcon}
              alt="CareerPath AI Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
          <span className="dark:text-white text-black">
            careerpath ai
            <span className="text-orange-500 text-3xl font-extrabold">.</span>
          </span>
        </Link>

        {/* Right (mobile/tablet): theme + menu */}
        <div className="lg:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            {isOpen ? (
              <RiCloseLargeFill size={24} />
            ) : (
              <RiMenu2Fill size={24} />
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition duration-200 ${
                pathname === link.to
                  ? "text-blue-600 dark:text-blue-400 underline underline-offset-4"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Profile Dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-medium p-2 border border-gray-300 hover:border-gray-500 rounded-full  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-blue-400"
              >
                <FaRegCircleUser size={20} />
                <TbMenu4 size={20} />
              </button>

              {/* Animated Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 origin-top-right scale-95 animate-dropdown transition-all duration-200 ease-out">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LuLayoutDashboard className="text-lg" />
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LuSquareUserRound className="text-lg" />
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      Navigate("/login");
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900 text-left"
                  >
                    <AiOutlineLogout className="text-lg" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 px-4 pb-4">
          <div className="flex flex-col space-y-3 pt-3">
            <Link
              to="/chat"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                pathname === "/chat"
                  ? "bg-indigo-100 dark:bg-indigo-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <LuMessagesSquare className="text-lg" />
              Chat
            </Link>

            <Link
              to="/roadmap"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                pathname === "/resume"
                  ? "bg-indigo-100 dark:bg-indigo-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <LuFileText className="text-lg" />
              Roadmap
            </Link>

            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                pathname === "/courses"
                  ? "bg-indigo-100 dark:bg-indigo-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <LuGraduationCap className="text-lg" />
              Courses
            </Link>

            <Link
              to="/interview"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                pathname === "/interview"
                  ? "bg-indigo-100 dark:bg-indigo-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <LuFileText className="text-lg" />
              Interview
            </Link>

            <Link
              to="/mockinterview"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition ${
                pathname === "/interview"
                  ? "bg-indigo-100 dark:bg-indigo-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <LuFileText className="text-lg" />
              Mock Interview
            </Link>

            {user && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <LuLayoutDashboard className="text-lg" />
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <LuSquareUserRound className="text-lg" />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    Navigate("/login");
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 w-full text-left rounded"
                >
                  <AiOutlineLogout className="text-lg" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
