import React, { useState, useEffect } from "react";
import { LuMessagesSquare, LuTrash } from "react-icons/lu";
import { RiCloseLargeFill } from "react-icons/ri";
import { MdOutlineNavigateNext } from "react-icons/md";
import {
  IoSettingsOutline,
  IoBookOutline,
  IoHelpCircleOutline,
} from "react-icons/io5";

// const formatDate = (isoString) => {
//   const date = new Date(isoString);
//   const today = new Date();
//   const isToday = date.toDateString() === today.toDateString();
//   const isYesterday =
//     new Date(Date.now() - 86400000).toDateString() === date.toDateString();
//   if (isToday) return "Today";
//   if (isYesterday) return "Yesterday";
//   return date.toLocaleDateString();
// };

const Sidebar = ({ chatList, chatId, onLoadChat, onDeleteChat, onNewChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isOpen && isMobile && (
        <button
          className="fixed top-20 left-[-6px] z-[60] bg-slate-400 rounded-r-full text-black transition"
          onClick={() => setIsOpen(true)}
          aria-label="Open Sidebar"
        >
          <MdOutlineNavigateNext  size={28} />
        </button>
      )}

      {/* Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 top-[64px] bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed md:relative top-[64px] md:top-0 left-0 h-[calc(100vh-64px)] md:h-full w-64 
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
        transform transition-transform duration-300 z-50 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full pt-2">
          {/* New Chat */}
          <div className="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <button
              onClick={() => {
                onNewChat();
                if (isMobile) setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-md cursor-pointer duration-200 shadow-sm border border-transparent text-white bg-blue-900 dark:bg-blue-900 border-blue-400 dark:border-blue-500 transition"
            >
              <LuMessagesSquare size={18} />
              New Chat
            </button>
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 text-gray-400 hover:text-white transition p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-full"
                title="Close Sidebar"
              >
                <RiCloseLargeFill size={22} />
              </button>
            )}
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {chatList.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No chats yet</p>
            ) : (
              chatList.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => {
                    onLoadChat(chat._id);
                    if (isMobile) setIsOpen(false);
                  }}
                  className={`group px-2 py-1 rounded-md cursor-pointer transition-all duration-200 shadow-sm border border-transparent 
                  ${
                    chat._id === chatId
                      ? "bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate w-[80%]">
                      {chat.chatType || "Untitled Chat"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat._id);
                      }}
                      className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition"
                      title="Delete chat"
                    >
                      <LuTrash size={16} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {/* {formatDate(chat.createdAt)} */}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Links with Icons */}
          <div className="mt-auto border-t border-gray-200 dark:border-gray-800 px-2 py-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <IoSettingsOutline size={18} />
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <IoBookOutline size={18} />
              <span>Resources</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <IoHelpCircleOutline size={18} />
              <span>Help & FAQ</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;