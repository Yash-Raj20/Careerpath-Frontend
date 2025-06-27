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
      <div className="flex-1 flex flex-col relative">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <ChatInput
              input={input}
              setInput={setInput}
              onSend={sendMessage}
              isLoading={loading}
              isCentered={true}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i}>
                  <MessageBubble sender={msg.role} text={msg.content} />
                  <div
                    className={`text-xs text-gray-400 ${
                      msg.role === "user" ? "text-right pr-4" : "text-left pl-4"
                    }`}
                  >
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-gray-400 animate-pulse">
                  <PiDotsThreeCircleBold size={24} />
                  <span>AI is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className=" bg-white dark:bg-gray-950 px-4 py-3">
              <ChatInput
                input={input}
                setInput={setInput}
                onSend={sendMessage}
                isLoading={loading}
                isCentered={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;