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
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
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

  // Close emoji picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmoji && !event.target.closest('.emoji-picker-container')) {
        setShowEmoji(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmoji]);

  return (
    <div
      className={`w-full ${
        isCentered ? "max-w-lg sm:max-w-xl lg:max-w-2xl" : "max-w-full lg:max-w-3xl"
      } mx-auto px-2 sm:px-3 md:px-4 pb-2 sm:pb-4 transition-all`}
    >
      <div className="relative bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl sm:rounded-2xl px-2 sm:px-3 md:px-4 py-2 sm:py-3 shadow-lg min-w-0">
        
        {/* Desktop Layout - Side by side */}
        <div className="hidden md:flex items-end gap-2">
          {/* Action Buttons Container */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* 📎 File Upload */}
            <label className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
              <BsPaperclip size={20} />
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) console.log("Selected file:", file);
                }}
              />
            </label>

            {/* 😊 Emoji Button */}
            <div className="relative emoji-picker-container">
              <button
                onClick={() => setShowEmoji((prev) => !prev)}
                className="text-gray-500 hover:text-yellow-500 transition-colors"
                type="button"
                title="Emoji"
              >
                <FaRegSmile size={20} />
              </button>
              {showEmoji && (
                <div className="absolute bottom-12 right-0 z-50 emoji-picker-container">
                  <EmojiPicker 
                    onEmojiClick={handleEmojiClick} 
                    theme="auto"
                    width={280}
                    height={350}
                  />
                </div>
              )}
            </div>

            {/* 🎤 Voice Button */}
            <button
              onClick={handleVoiceInput}
              className="text-gray-500 hover:text-red-500 transition-colors"
              type="button"
              title="Voice Input"
            >
              <BsMic size={20} />
            </button>
          </div>

          {/* 📝 Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            disabled={isLoading}
            className="flex-1 resize-none px-4 py-2 min-h-[42px] max-h-[120px] overflow-y-auto no-scrollbar rounded-xl
              bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              disabled:opacity-60 text-base transition-all
              placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />

          {/* 🚀 Send Button */}
          <button
            onClick={handleSendClick}
            disabled={isLoading || input.trim() === ""}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl
              bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800
              disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow
              min-w-[80px] flex-shrink-0"
          >
            <LuSend className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isLoading ? "Sending..." : "Send"}
            </span>
          </button>
        </div>

        {/* Mobile/Tablet Layout - Stacked */}
        <div className="md:hidden">
          {/* 📝 Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            disabled={isLoading}
            className="w-full resize-none px-3 py-2 min-h-[40px] max-h-[100px] overflow-y-auto no-scrollbar rounded-lg
              bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              disabled:opacity-60 text-sm transition-all
              placeholder:text-gray-400 dark:placeholder:text-gray-500 mb-2"
          />

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between">
            {/* Left Actions */}
            <div className="flex items-center gap-3">
              {/* 📎 File Upload */}
              <label className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors">
                <BsPaperclip size={18} />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) console.log("Selected file:", file);
                  }}
                />
              </label>

              {/* 😊 Emoji Button */}
              <div className="relative emoji-picker-container">
                <button
                  onClick={() => setShowEmoji((prev) => !prev)}
                  className="text-gray-500 hover:text-yellow-500 transition-colors"
                  type="button"
                  title="Emoji"
                >
                  <FaRegSmile size={18} />
                </button>
                {showEmoji && (
                  <div className="absolute bottom-8 left-0 z-50 emoji-picker-container">
                    <div className="scale-75 sm:scale-90 origin-bottom-left">
                      <EmojiPicker 
                        onEmojiClick={handleEmojiClick} 
                        theme="auto"
                        width={280}
                        height={350}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 🎤 Voice Button */}
              <button
                onClick={handleVoiceInput}
                className="text-gray-500 hover:text-red-500 transition-colors"
                type="button"
                title="Voice Input"
              >
                <BsMic size={18} />
              </button>
            </div>

            {/* 🚀 Send Button */}
            <button
              onClick={handleSendClick}
              disabled={isLoading || input.trim() === ""}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800
                disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow
                min-w-[70px] flex-shrink-0"
            >
              <LuSend className="w-4 h-4" />
              <span className="text-sm font-medium">
                {isLoading ? "Sending..." : "Send"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;