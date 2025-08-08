import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiMenu2Fill, RiCloseLargeFill, RiRoadMapLine } from "react-icons/ri";
import {
  LuLayoutDashboard,
  LuSquareUserRound,
  LuMessagesSquare,
} from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbMenu4, TbMessageChatbot } from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineSpatialAudioOff } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import { FiCpu as FiBrain, FiBookOpen } from "react-icons/fi";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { user, logout } = useContext(AuthContext);
  const Navigate = useNavigate();

  const links = [
    { label: "Home", to: "/home", icon: <TiHomeOutline size={18} /> },
    { label: "Chat", to: "/chat", icon: <LuMessagesSquare size={18} /> },
    { label: "Courses", to: "/courses", icon: <FiBookOpen size={18} /> },
    { label: "Roadmap", to: "/roadmap", icon: <RiRoadMapLine size={18} /> },
    {
      label: "Interview",
      to: "/interview",
      icon: <TbMessageChatbot size={18} />,
    },
    {
      label: "Mock Interview",
      to: "/mockinterview",
      icon: <MdOutlineSpatialAudioOff size={18} />,
    },
  ];

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
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[4.5rem]">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <FiBrain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CareerPath AI
            </span>
          </div>

          {/* Center: Desktop nav links */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-md font-medium transition-colors ${
                  pathname === item.to
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Theme + Auth + Hamburger */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Desktop: Auth */}
            {user ? (
              <div className="hidden lg:block relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 text-sm font-medium px-3 py-2 hover:bg-gray-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:bg-gray-800 dark:hover:bg-gray-500 rounded-full transition"
                >
                  <FaRegCircleUser
                    className="text-gray-800 dark:text-white"
                    size={18}
                  />
                  <TbMenu4
                    className="text-gray-800 dark:text-white"
                    size={18}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 px-1 bg-white dark:bg-gray-800 shadow py-3 z-50 rounded-lg animate-dropdown">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <LuLayoutDashboard size={18} />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <LuSquareUserRound size={18} />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        Navigate("/");
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <AiOutlineLogout size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Get Started
              </Link>
            )}

            {/* Mobile: Hamburger */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {isOpen ? (
                  <RiCloseLargeFill size={24} />
                ) : (
                  <RiMenu2Fill size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-2 border-t border-gray-300 dark:border-gray-700 pb-4">
            <div className="pt-3 space-y-2">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition text-sm font-medium ${
                    pathname === item.to
                      ? "bg-indigo-100 dark:bg-indigo-900 text-purple-700 dark:text-purple-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <LuLayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <LuSquareUserRound size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                      Navigate("/");
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 w-full text-left rounded"
                  >
                    <AiOutlineLogout size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
