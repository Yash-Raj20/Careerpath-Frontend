import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import MessageBubble from "../components/MessageBubble";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import {
  FaPaperPlane,
  FaDownload,
  FaAngleDown,
  FaTrashRestore,
  FaRegLightbulb,
} from "react-icons/fa";
import { IoSparklesOutline, IoSparklesSharp } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";

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

  const startInterview = async () => {
    if (!role) return toast.error("Please select a role.");
    setLoading(true);
    try {
      const res = await axios.post("/interview/start", { role });
      const reply = res.data.reply;
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
      const res = await axios.post("/interview/start", {
        role,
        userAnswer: answer,
        prevMessages: chat.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      });

      const reply = res.data.reply;
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
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      {/* LEFT Inspiration Panels (Quotes / Tips) */}
      <div className="hidden lg:block absolute left-5 top-1/3 -translate-y-1/2 px-4 w-64 space-y-6">
        {/* Style 1: Modern & Clean */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-800 p-5 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-700 text-sm text-gray-800 dark:text-blue-100 space-y-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up">
          <h3 className="font-extrabold text-lg text-blue-700 dark:text-blue-300 flex items-center">
            <span className="text-2xl mr-2">💡</span> Pro Tip
          </h3>
          <p className="leading-relaxed">
            "Focus on **problem-solving**, not just syntax. Understanding the
            'why' is key."
          </p>
        </div>

        {/* Style 2: Elegant & Sophisticated */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-800 p-5 rounded-2xl shadow-xl border border-purple-200 dark:border-purple-700 text-sm text-gray-800 dark:text-purple-100 space-y-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-100">
          <h3 className="font-extrabold text-lg text-purple-700 dark:text-purple-300 flex items-center">
            <span className="text-2xl mr-2">🎯</span> Interview Mindset
          </h3>
          <p className="leading-relaxed">
            "**Confidence** is rooted in preparation. Approach every challenge
            with a strategic mindset."
          </p>
        </div>

        {/* Style 3: Bold & Dynamic */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-800 p-5 rounded-2xl shadow-xl border border-red-200 dark:border-red-700 text-sm text-gray-800 dark:text-red-100 space-y-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up delay-200">
          <h3 className="font-extrabold text-lg text-red-700 dark:text-red-300 flex items-center">
            <span className="text-2xl mr-2">🔥</span> Motivation Boost
          </h3>
          <p className="leading-relaxed">
            "Every question is an **opportunity** to showcase your skills, not
            merely a test of knowledge."
          </p>
        </div>
      </div>

      {/* RIGHT AI Panels (From the AI / Fun Facts) */}
      <div className="hidden lg:block absolute right-5 top-1/3 -translate-y-1/2 px-4 w-64 space-y-6">
        {/* Style 1: Tech-Inspired */}
        <div className="bg-gradient-to-bl from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-800 p-5 rounded-2xl shadow-xl border border-emerald-200 dark:border-emerald-700 text-sm text-gray-800 dark:text-emerald-100 space-y-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-down">
          <h3 className="font-extrabold text-lg text-emerald-700 dark:text-emerald-300 flex items-center">
            <span className="text-2xl mr-2">🤖</span> From the AI
          </h3>
          <p className="leading-relaxed">
            "**Think out loud** during interviews. It clarifies your process and
            engages the interviewer."
          </p>
        </div>

        {/* Style 2: Analytical & Clear */}
        <div className="bg-gradient-to-bl from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-800 p-5 rounded-2xl shadow-xl border border-teal-200 dark:border-teal-700 text-sm text-gray-800 dark:text-teal-100 space-y-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-down delay-100">
          <h3 className="font-extrabold text-lg text-teal-700 dark:text-teal-300 flex items-center">
            <span className="text-2xl mr-2">🔍</span> Key Insight
          </h3>
          <p className="leading-relaxed">
            "**Technical depth** always outperforms buzzwords. Strive for
            precision in your answers."
          </p>
        </div>

        {/* Style 3: Playful & Encouraging */}
        <div className="bg-gradient-to-bl from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-800 p-5 rounded-2xl shadow-xl border border-amber-200 dark:border-amber-700 text-sm text-gray-800 dark:text-amber-100 space-y-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-down delay-200">
          <h3 className="font-extrabold text-lg text-amber-700 dark:text-amber-300 flex items-center">
            <span className="text-2xl mr-2">💬</span> AI's Wisdom
          </h3>
          <p className="leading-relaxed">
            "Don't forget to **relax**. Even advanced AI models learn and
            improve through iterative debugging!"
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 border border-gray-200 dark:border-gray-500 transition-all duration-300 z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-6 flex items-center justify-center">
            <IoSparklesOutline
              className="inline-block mr-3 text-yellow-500"
              size={36}
            />
            CareerPath AI Interview Assistant
            <IoSparklesOutline
              className="inline-block ml-3 text-yellow-500"
              size={36}
            />
          </h1>

          {/* Role Selection & Export */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow-inner border border-gray-200 dark:border-gray-600">
            <div className="relative w-full sm:w-2/3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none w-full p-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer shadow-sm"
                disabled={loading}
              >
                <option value="">🎯 Select an Interview Role</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Project Manager">Project Manager</option>
                <option value="UX/UI Designer">UX/UI Designer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
              </select>
              <FaAngleDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
                size={20}
              />
            </div>

            <button
              onClick={exportChatAsPDF}
              disabled={chat.length === 0 || loading}
              className="w-full sm:w-auto flex items-center justify-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
            >
              <FaDownload size={20} className="mr-2" />
              Export PDF
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={startInterview}
              disabled={loading || !role}
              className="flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
            >
              {loading ? (
                <>
                  <IoSparklesSharp size={20} className="mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <IoSparklesSharp size={20} className="mr-2" />
                  Start Interview
                </>
              )}
            </button>
            <button
              onClick={clearChat}
              disabled={loading}
              className="flex items-center justify-center bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
            >
              <FaTrashRestore size={20} className="mr-2" /> Clear Chat
            </button>
          </div>

          {/* chat display area */}
          <div className="h-[400px] sm:h-[500px] overflow-y-auto bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-4 sm:p-6 space-y-4 shadow-inner custom-scrollbar transition-all duration-300">
            {chat.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500 p-4">
                <MdInfoOutline
                  size={48}
                  className="mb-4 text-blue-400 dark:text-blue-600"
                />
                <p className="text-xl font-semibold text-center mb-2">
                  Welcome to your AI Interview Assistant!
                </p>
                <p className="text-md text-center mb-4 max-w-prose">
                  Select a role from the dropdown above and click "Start
                  Interview" to begin your practice session. The AI will ask you
                  questions relevant to your chosen role.
                </p>
                <div className="bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-sm text-blue-800 dark:text-blue-200 flex items-start max-w-sm">
                  <FaRegLightbulb
                    size={20}
                    className="mt-0.5 mr-2 flex-shrink-0"
                  />
                  <span>
                    <span className="font-bold">Tip:</span> You can clear the
                    chat or export it as a PDF at any time.
                  </span>
                </div>
              </div>
            ) : (
              chat.map((msg, idx) => (
                <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
              ))
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <textarea
              ref={textareaRef}
              value={answer}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="💬 Type your answer here..."
              className="flex-1 font-medium p-3 border border-gray-300 dark:border-gray-600 rounded-xl overflow-y-auto resize-none leading-6 transition-all duration-300 max-h-40 bg-white dark:bg-gray-800 dark:text-white shadow-md focus:ring-2 focus:ring-blue-500 focus:border-transparent custom-scrollbar placeholder:text-gray-400 dark:placeholder:text-gray-500"
              disabled={
                loading ||
                chat.length === 0 ||
                chat[chat.length - 1]?.sender === "user"
              }
              style={{ height: "auto" }}
            />
            <button
              onClick={sendAnswer}
              disabled={
                loading ||
                !answer.trim() ||
                chat.length === 0 ||
                chat[chat.length - 1]?.sender === "user"
              }
              className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 active:scale-95"
            >
              <FaPaperPlane size={20} className="mr-2" />
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
      </main>
    </div>
  );
};

export default Interview;
