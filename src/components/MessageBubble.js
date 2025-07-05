import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiSparklingFill } from "react-icons/ri";
import FormattedMessage from "./FormattedMessage";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Bot Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <RiSparklingFill className="text-white text-sm" />
        </div>
      )}

      {/* Message Content with dynamic and responsive width */}
      <div
        className={`
          w-fit max-w-[88%] md:max-w-[70%]
          ${isUser ? "text-right" : "text-left"}
        `}
      >
        {isUser ? (
          <div
            className="
              inline-block px-4 py-2 rounded-2xl text-sm shadow-md
              bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
              rounded-br-none whitespace-pre-wrap break-words
            "
          >
            {text}
          </div>
        ) : (
          <FormattedMessage content={text} />
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
          <FaUserCircle className="text-white text-lg" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;