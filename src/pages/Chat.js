import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import { PiDotsThreeCircleBold } from "react-icons/pi";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";

const Chat = () => {
  const [chatId, setChatId] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  // Load existing chat if any
  useEffect(() => {
    const lastChatId = localStorage.getItem("selectedChatId");
    if (lastChatId) loadChat(lastChatId);
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setChatSession = (id) => {
    setChatId(id);
    if (id) {
      localStorage.setItem("selectedChatId", id);
    } else {
      localStorage.removeItem("selectedChatId");
    }
  };

  const fetchChats = async () => {
    try {
      const res = await axios.get("/chat");
      setChatList(res.data);
    } catch (err) {
      console.error("Failed to fetch chats", err);
    }
  };

  const loadChat = async (id) => {
    try {
      const res = await axios.get(`/chat/${id}`);
      setMessages(
        (res.data.messages || []).map((msg) => ({
          ...msg,
          timestamp: msg.timestamp || new Date().toISOString(),
        }))
      );
      setChatSession(res.data._id);
      setSidebarOpen(false); // auto close sidebar on mobile
    } catch (err) {
      console.error("Failed to load chat", err);
    }
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = {
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/chat/message", {
        message: trimmed,
        chatId,
      });

      const assistantReply = res.data?.reply || "No response";
      const aiMsg = {
        role: "assistant",
        content: assistantReply,
        timestamp: new Date().toISOString(),
      };

      if (!chatId) {
        const newId = res.data.chatId;
        setChatSession(newId);

        const fullChat = await axios.get(`/chat/${newId}`);
        setMessages(
          (fullChat.data.messages || []).map((msg) => ({
            ...msg,
            timestamp: msg.timestamp || new Date().toISOString(),
          }))
        );
        fetchChats();
      } else {
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error("Failed to send message", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (id) => {
    try {
      await axios.delete(`/chat/${id}`);
      if (id === chatId) {
        setChatSession(null);
        setMessages([]);
      }
      fetchChats();
    } catch (err) {
      console.error("Failed to delete chat", err);
    }
  };

  const newChat = () => {
    setChatSession(null);
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar
        chatList={chatList}
        chatId={chatId}
        onLoadChat={loadChat}
        onDeleteChat={deleteChat}
        onNewChat={newChat}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative min-w-0">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-3 py-4 sm:px-4 sm:py-8 text-center space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Welcome Title */}
            <div className="space-y-2 max-w-full">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white px-2">
                Welcome to Careerpath AI
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-2 leading-relaxed">
                Ask me anything about web dev, programming, jobs, or life. I'm
                here to help — like ChatBot, but with a career twist!
              </p>
            </div>

            {/* Suggested Prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-left px-2">
              {[
                "💡 How do I learn React in 30 days?",
                "📚 Suggest a roadmap for full-stack development",
                "🧠 Explain closures in JavaScript",
                "🧪 Mock interview questions for frontend",
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setInput(suggestion.replace(/^[^a-zA-Z]+/, ""))
                  }
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 rounded-lg sm:rounded-xl transition text-left shadow-sm hover:shadow-md active:scale-95 transform"
                >
                  <span className="block truncate">{suggestion}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl px-2">
              <ChatInput
                input={input}
                setInput={setInput}
                onSend={sendMessage}
                isLoading={loading}
                isCentered={true}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-4 sm:py-6 md:px-32 md:py-6 space-y-3 sm:space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <div key={i} className="w-full">
                  <MessageBubble sender={msg.role} text={msg.content} />
                  <div
                    className={`text-xs text-gray-400 mt-1 ${
                      msg.role === "user" 
                        ? "text-right pr-2 sm:pr-4" 
                        : "text-left pl-2 sm:pl-4"
                    }`}
                  >
                    {/* You can add timestamp here if needed */}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-gray-400 animate-pulse px-2 sm:px-4">
                  <PiDotsThreeCircleBold size={20} className="sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base">AI is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white dark:bg-gray-950 px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4 border-t border-gray-200 dark:border-gray-800 md:border-t-0">
              {/* Chat Input */}
              <div className="max-w-full mx-auto">
                <ChatInput
                  input={input}
                  setInput={setInput}
                  onSend={sendMessage}
                  isLoading={loading}
                  isCentered={false}
                />
              </div>
              {/* Disclaimer */}
              <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                ⚠️ AI can make mistakes. Check important information.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;