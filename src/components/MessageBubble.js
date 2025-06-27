import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import FormattedMessage from "./FormattedMessage";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <FaRobot className="text-white text-sm" />
        </div>
      )}

      {/* Message Content with conditional width */}
      <div className={`${isUser ? "w-[40%]" : "w-[70%]"}`}>
        {isUser ? (
          <div className="px-4 py-2 rounded-2xl text-sm shadow-md 
            bg-blue-600 text-white rounded-br-none whitespace-pre-wrap break-words">
            {text}
          </div>
        ) : (
          <FormattedMessage content={text} />
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <FaUser className="text-white text-sm" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;