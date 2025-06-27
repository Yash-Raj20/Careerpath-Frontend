import React, { useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { FaRegSmile } from "react-icons/fa";
import { BsPaperclip, BsMic } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

const ChatInput = ({ input, setInput, onSend, isLoading, isCentered = false }) => {
  const textareaRef = useRef(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) onSend();
    }
  };

  const handleInputChange = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    setInput(e.target.value);
  };

  const handleSendClick = () => {
    if (!isLoading && input.trim()) onSend();
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition(); // for Chrome
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };
    recognition.start();
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  return (
    <div
      className={`${
        isCentered ? "w-full max-w-2xl mx-auto" : ""
      } w-full max-w-3xl mx-auto px-4 py-3 transition-all`}
    >
      <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 flex items-end gap-2 shadow-lg">
        {/* 📎 File Upload */}
        <label className="text-gray-500 hover:text-blue-600 cursor-pointer transition">
          <BsPaperclip size={18} />
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                console.log("Selected file:", file);
              }
            }}
          />
        </label>

        {/* 😊 Emoji Button */}
        <div className="relative">
          <button
            onClick={() => setShowEmoji((prev) => !prev)}
            className="text-gray-500 hover:text-yellow-500 transition"
            type="button"
            title="Emoji"
          >
            <FaRegSmile size={18} />
          </button>
          {showEmoji && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
        </div>

        {/* 🎤 Voice Button */}
        <button
          onClick={handleVoiceInput}
          className="text-gray-500 hover:text-red-500 transition"
          type="button"
          title="Voice Input"
        >
          <BsMic size={18} />
        </button>

        {/* 📝 Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 resize-none px-3 py-2 min-h-[42px] max-h-[120px] overflow-y-auto no-scrollbar rounded-lg
            bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            disabled:opacity-60 transition-all"
        />

        {/* 🚀 Send Button */}
        <button
          onClick={handleSendClick}
          disabled={isLoading || input.trim() === ""}
          className="flex items-center gap-1 px-4 py-2 rounded-lg 
            bg-blue-600 text-white hover:bg-blue-700 
            disabled:opacity-50 disabled:cursor-not-allowed transition shadow"
        >
          <LuSend className="w-4 h-4" />
          <span className="hidden sm:inline">
            {isLoading ? "Sending..." : "Send"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;