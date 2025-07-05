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
import Logo from "../assets/Logo.svg";

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
        <Link to="/chat" className="flex items-center gap-1 sm:gap-1">
          <img
            src={Logo}
            alt="CareerPath AI Logo"
            className="h-12 sm:h-12 w-auto object-contain align-middle"
          />
          <span className="text-lg sm:text-2xl font-extrabold text-black dark:text-white leading-none tracking-tight flex items-baseline">
            careerpath&nbsp;ai
            <span className="text-[#D6950A] text-xl sm:text-3xl font-extrabold ml-[1px]">
              .
            </span>
          </span>
        </Link>

        {/* Right (mobile/tablet): theme + menu */}
        <div className="lg:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-gray-600 rounded-full p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
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
              className={`text-[16px] font-medium transition duration-200 ${
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
                className="flex items-center gap-1 text-sm font-medium p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:bg-gray-200 rounded-full  text-gray-700 dark:text-gray-300 dark:border dark:hover:bg-gray-700 dark:hover:text-blue-400 transition-all duration-300"
              >
                <FaRegCircleUser size={20} />
                <TbMenu4 size={20} />
              </button>

              {/* Animated Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 px-1 bg-white rounded-md dark:bg-gray-800 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-3 z-50 origin-top-right animate-dropdown transition-all duration-200 ease-out">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-[16px] font-medium rounded-xl text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LuLayoutDashboard size={20} />
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-[16px] font-medium rounded-xl text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LuSquareUserRound size={20} />
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      Navigate("/login");
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-[16px] font-medium rounded-xl text-red-600 dark:text-red-500 dark:hover:text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                  >
                    <AiOutlineLogout size={20} />
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
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 px-4 pb-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] animate-dropdown transition-all duration-200 ease-out">
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
