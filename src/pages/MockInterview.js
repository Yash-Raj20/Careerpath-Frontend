import { useState, useRef, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";

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
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
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
    setMessages((prev) => [...prev, { type: "ai", text: "💬 AI is typing...", isTyping: true }]);

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
        feedback.toLowerCase().includes("incorrect") || feedback.toLowerCase().includes("wrong");

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
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-6">
        🎙️ AI Mock Interview
      </h2>

      {/* Form */}
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
        <input
          type="text"
          placeholder="e.g., Frontend Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="flex-1 p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 border rounded dark:bg-gray-900 dark:border-gray-600"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button
          onClick={handleStart}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Starting..." : "Start"}
        </button>
      </div>

      {/* 💬 Chat Box */}
      <div
        ref={chatRef}
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow max-h-[400px] overflow-y-auto space-y-3"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                msg.type === "user"
                  ? "bg-green-100 dark:bg-green-900 text-right"
                  : "bg-blue-100 dark:bg-blue-900 text-left"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* 📝 Answer Input */}
      {questions.length > 0 && currentQ < questions.length && (
        <>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={3}
            placeholder="✍️ Type or speak your answer..."
            className="w-full mt-4 p-3 border rounded dark:bg-gray-900 dark:border-gray-600"
          />
          <div className="flex gap-3 mt-2">
            <button
              onClick={recordVoice}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              🎤 Speak
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
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {currentQ < questions.length - 1 ? "Submit" : "Finish"}
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
            💡 Tip: You can type or say <strong>"skip"</strong> or <strong>"next"</strong> to move to the next question.
          </p>
        </>
      )}
    </div>
  );
}