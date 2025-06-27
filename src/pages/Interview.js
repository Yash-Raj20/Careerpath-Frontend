import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import MessageBubble from "../components/MessageBubble";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";

const MOCK_MODE = true;

const Interview = () => {
  const [role, setRole] = useState("");
  const [chat, setChat] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("interview_chat");
    if (saved) setChat(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("interview_chat", JSON.stringify(chat));
  }, [chat]);

  const getMockReply = (input) => {
    const predefined = {
      "Interview started": {
        "Frontend Developer": "Can you explain the virtual DOM in React?",
        "Backend Developer": "What are the differences between SQL and NoSQL?",
        "Data Analyst": "How would you handle missing values in a dataset?",
      },
      default: [
        "Interesting! Can you go deeper?",
        "Why do you think that approach works best?",
        "Good. What would you improve in your previous answer?",
      ],
    };

    if (input === "Interview started") {
      return predefined["Interview started"][role] || "Let's begin!";
    }

    const responses = predefined.default;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startInterview = async () => {
    if (!role) return toast.error("Please select a role.");
    setLoading(true);
    try {
      const reply = MOCK_MODE
        ? getMockReply("Interview started")
        : (await axios.post("/interview/start", { role })).data.reply;

      setChat([{ sender: "bot", text: reply }]);
      setAnswer("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to start interview.");
    } finally {
      setLoading(false);
    }
  };

  const sendAnswer = async () => {
    if (!answer.trim()) return;

    const userMsg = { sender: "user", text: answer };
    const typing = { sender: "bot", text: "⏳ Typing..." };
    setChat((prev) => [...prev, userMsg, typing]);
    setAnswer("");
    setLoading(true);

    try {
      let reply = "";

      if (MOCK_MODE) {
        reply = getMockReply(answer);
        await new Promise((res) => setTimeout(res, 700));
      } else {
        const res = await axios.post("/interview/start", {
          role,
          userAnswer: answer,
          prevMessages: chat.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
        });
        reply = res.data.reply;
      }

      setChat((prev) => [...prev.slice(0, -1), { sender: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send answer.");
      setChat((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleClearConfirmed = () => {
    setChat([]);
    localStorage.removeItem("interview_chat");
    toast.success("Chat cleared");
    setShowConfirm(false);
  };

  const clearChat = () => setShowConfirm(true);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && answer.trim()) sendAnswer();
    }
  };

  const handleInputChange = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const maxHeight = 5 * 24;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    setAnswer(e.target.value);
  };

  const exportChatAsPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("CareerPath AI - Interview Chat", 10, 10);
    let y = 20;

    chat.forEach((msg) => {
      const sender = msg.sender === "user" ? "You" : "Bot";
      const text = doc.splitTextToSize(`${sender}: ${msg.text}`, 180);
      if (y + text.length * 10 > 280) {
        doc.addPage();
        y = 10;
      }
      doc.setFontSize(12);
      doc.text(text, 10, y);
      y += text.length * 10;
    });

    doc.save(`interview_chat_${role || "unknown"}.pdf`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold text-center">🎙 Take Interview with AI</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full sm:w-2/3 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="">🎯 Select Role</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Data Analyst">Data Analyst</option>
        </select>

        <button
          onClick={exportChatAsPDF}
          disabled={chat.length === 0}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          📄 Export PDF
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={startInterview}
          disabled={loading || !role}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "⏳ Starting..." : "▶️ Start Interview"}
        </button>
        <button
          onClick={clearChat}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          🗑 Clear Chat
        </button>
      </div>

      <div className="h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded p-4 space-y-2 shadow-inner transition">
        {chat.map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {chat.length === 0 && (
          <p className="text-center text-gray-400">No conversation yet</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <textarea
          ref={textareaRef}
          value={answer}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="💬 Type your answer..."
          className="flex-1 font-medium p-2 border rounded overflow-y-auto no-scrollbar resize-none leading-6 transition-all max-h-40 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          style={{ height: "auto" }}
          disabled={loading}
        />

        <button
          onClick={sendAnswer}
          disabled={loading || !answer.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Clear Chat History?"
        message="This action cannot be undone. Do you really want to delete the entire conversation?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleClearConfirmed}
      />
    </div>
  );
};

export default Interview;