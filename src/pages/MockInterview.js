import { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { IoSparklesOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { FaAward, FaMicrophone, FaPaperPlane, FaPlay } from "react-icons/fa";

export default function MockInterview() {
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [messages, setMessages] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const synth = window.speechSynthesis;
  const chatRef = useRef(null);

  // 🔊 Speak
  const speakText = (text, cb) => {
    if (!text) return;
    if (synth.speaking) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;

    if (cb) utterance.onend = cb;

    synth.speak(utterance);
  };

  // 🎤 Voice Input
  const recordVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const result = event.results[0][0].transcript.toLowerCase().trim();

      if (["skip", "next"].includes(result)) {
        await handleNext("skip");
      } else {
        setUserInput(result);
        await handleNext(result);
      }
    };

    recognition.onerror = () => alert("Voice recognition failed.");
    recognition.start();
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleStart = async () => {
    if (!role.trim()) return alert("Please enter a role.");
    setLoading(true);
    try {
      const res = await axios.post("/ai/mock-interview", {
        role,
        experienceLevel: level,
        minQuestions: 15,
      });
      const qs = res.data.questions;
      setQuestions(qs);
      setMessages([{ type: "ai", text: qs[0] }]);
      setCurrentQ(0);
      setUserInput("");
      speakText(qs[0]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to start interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async (input = userInput) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      toast.error("Please answer the question before submitting.");
      return;
    }

    const q = questions[currentQ];
    const isSkip = ["skip", "next"].includes(trimmedInput);
    const a = isSkip ? "Skipped" : trimmedInput;

    setMessages((prev) => [...prev, { type: "user", text: a }]);
    setUserInput("");

    if (isSkip) {
      goToNextQuestion();
      return;
    }

    // Typing...
    setMessages((prev) => [
      ...prev,
      { type: "ai", text: "💬 AI is typing...", isTyping: true },
    ]);

    let feedback = "Unable to evaluate your answer.";
    try {
      const res = await axios.post("/ai/evaluate-answer", {
        question: q,
        answer: a,
        role,
      });
      feedback = res.data.feedback;
    } catch (err) {
      console.error("Evaluation failed:", err);
    }

    // Replace "typing" with feedback
    setMessages((prev) => [
      ...prev.filter((m) => !m.isTyping),
      { type: "ai", text: `🧠 Feedback: ${feedback}` },
    ]);

    speakText(`Feedback: ${feedback}`, () => {
      const isWrong =
        feedback.toLowerCase().includes("incorrect") ||
        feedback.toLowerCase().includes("wrong");

      if (isWrong) {
        const retry = `Let's try again: ${q}`;
        setMessages((prev) => [...prev, { type: "ai", text: retry }]);
        speakText(retry);
        return;
      }

      goToNextQuestion();
    });
  };

  const goToNextQuestion = () => {
    const nextQ = currentQ + 1;
    if (nextQ < questions.length) {
      const next = questions[nextQ];
      setCurrentQ(nextQ);
      setMessages((prev) => [...prev, { type: "ai", text: next }]);
      speakText(next);
    } else {
      const complete = "✅ Interview completed. Well done!";
      setMessages((prev) => [...prev, { type: "ai", text: complete }]);
      speakText(complete);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col gap-6 border border-gray-200 dark:border-gray-700 ">
          <h2 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-4 flex items-center justify-center gap-3">
            <IoSparklesOutline size={36} className="text-yellow-500" /> AI Mock
            Interview
          </h2>

          {/* Form */}
          <div className="flex flex-col md:flex-row gap-4 items-center mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner">
            <div className="flex-1 w-full">
              <label htmlFor="role-input" className="sr-only">
                Role
              </label>
              <input
                type="text"
                id="role-input"
                placeholder="e.g., Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
              />
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="level-select" className="sr-only">
                Experience Level
              </label>
              <select
                id="level-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 transition-colors duration-200"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button
              onClick={handleStart}
              disabled={loading}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Starting...
                </>
              ) : (
                <>
                  <FaPlay size={20} /> Start Interview
                </>
              )}
            </button>
          </div>

          {/* 💬 Chat Box */}
          <div
            ref={chatRef}
            className="bg-gray-100 dark:bg-gray-700 p-5 rounded-2xl shadow-inner max-h-[500px] overflow-y-auto space-y-4 border border-gray-200 dark:border-gray-600 custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(156, 163, 175, 0.5) transparent",
            }}
          >
            {messages.length === 0 && !loading && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <FaRegMessage size={48} className="mx-auto mb-3" />
                <p className="text-lg">Your interview will appear here.</p>
                <p>Enter a role and click "Start Interview" to begin!</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`px-5 py-3 rounded-3xl max-w-[85%] text-base shadow-md ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  } ${msg.isTyping ? "animate-pulse" : ""}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* 📝 Answer Input */}
          {questions.length > 0 && currentQ < questions.length && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={4}
                placeholder="✍️ Type or speak your answer here..."
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-y transition-colors duration-200 mb-3"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={recordVoice}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaMicrophone size={20} /> Speak
                </button>
                <button
                  onClick={() => {
                    const lower = userInput.trim().toLowerCase();
                    if (lower === "skip" || lower === "next") {
                      handleNext("skip");
                    } else {
                      handleNext();
                    }
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane size={20} />{" "}
                  {currentQ < questions.length - 1
                    ? "Submit Answer"
                    : "Finish Interview"}
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center italic">
                💡 Tip: You can type or say{" "}
                <strong className="font-semibold text-blue-500 dark:text-blue-300">
                  "skip"
                </strong>{" "}
                or{" "}
                <strong className="font-semibold text-blue-500 dark:text-blue-300">
                  "next"
                </strong>{" "}
                to move to the next question.
              </p>
            </div>
          )}

          {/* Interview Completed Message */}
          {questions.length > 0 && currentQ >= questions.length && (
            <div className="mt-6 p-6 bg-green-100 dark:bg-green-800 rounded-2xl shadow-lg text-center border border-green-200 dark:border-green-700 animate-fade-in-up">
              <FaAward
                size={64}
                className="mx-auto mb-4 text-green-600 dark:text-green-300"
              />
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-200 mb-2">
                Interview Completed!
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-200">
                Congratulations on completing your mock interview. You did
                great!
              </p>
              <button
                onClick={() => {
                  setRole("");
                  setLevel("Beginner");
                  setMessages([]);
                  setQuestions([]);
                  setCurrentQ(0);
                  setUserInput("");
                }}
                className="mt-6 bg-gradient-to-r from-teal-500 to-teal-700 text-white px-8 py-3 rounded-full shadow-lg hover:from-teal-600 hover:to-teal-800 transition-all duration-300 transform hover:scale-105"
              >
                Start New Interview
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
