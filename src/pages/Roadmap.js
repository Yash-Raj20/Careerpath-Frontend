import axios from "../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import TreePhaseVisual from "../components/TreePhase";

export default function Roadmap() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal.trim()) return toast.warning("Please enter your goal");
    setLoading(true);
    try {
      const res = await axios.post("/ai/roadmap", { goal });
      setRoadmap(res.data.roadmap);
      toast.success("✅ Roadmap generated successfully!");
    } catch (err) {
      console.error("Roadmap generation error:", err);
      toast.error("❌ Failed to generate roadmap.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!roadmap) return;
    navigator.clipboard.writeText(JSON.stringify(roadmap, null, 2));
    toast.success("📋 Roadmap copied to clipboard!");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Career Roadmap for ${goal}`, 10, 10);
    doc.setFontSize(12);

    if (Array.isArray(roadmap)) {
      let y = 20;
      roadmap.forEach((phase, i) => {
        doc.text(
          `${i + 1}. ${phase.title} (${phase.duration || "N/A"})`,
          10,
          y
        );
        y += 7;
        phase.children?.forEach((child) => {
          doc.text(`- ${child.title} (${child.duration || "N/A"})`, 15, y);
          y += 6;
        });
        y += 4;
      });
    } else {
      const lines = doc.splitTextToSize(String(roadmap), 180);
      doc.text(lines, 10, 20);
    }

    doc.save(`roadmap_${goal || "career"}.pdf`);
  };

  const renderStructuredRoadmap = () => {
    if (!Array.isArray(roadmap)) {
      return (
        <div className="text-red-500 bg-white dark:bg-gray-900 p-4 rounded shadow">
          ❌ Invalid roadmap format. Please try again.
        </div>
      );
    }

    return <TreePhaseVisual phases={roadmap} />;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-gray-900 dark:text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-2">
        🛤️ Career Roadmap Assistant
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
        Get a complete step-by-step roadmap to achieve your career goal!
      </p>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <input
          type="text"
          placeholder="🎯 e.g., Become a Frontend Developer"
          className="flex-1 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition disabled:opacity-50"
        >
          {loading ? "⏳ Generating..." : "Ask AI"}
        </button>
      </div>

      {/* Typing Indicator */}
      {loading && (
        <div className="mt-6">
          <div className="bg-blue-100 dark:bg-blue-900 text-sm px-4 py-3 rounded-xl w-fit animate-pulse">
            🤖 AI is typing<span className="animate-bounce">...</span>
          </div>
        </div>
      )}

      {/* Roadmap Chat Style */}
      {roadmap && (
        <div className="bg-gray-100 dark:bg-gray-800 mt-6 p-4 sm:p-6 rounded-xl shadow space-y-6">
          {/* User Message */}
          <div className="flex justify-end">
            <div className="bg-green-200 dark:bg-green-700 text-sm px-4 py-3 rounded-xl max-w-[85%] text-right">
              🧑‍💻 <strong>You:</strong> How do I become a {goal}?
            </div>
          </div>

          {/* AI Response */}
          <div className="flex justify-start">
            <div className="bg-blue-100 dark:bg-blue-900 text-sm px-4 py-4 rounded-xl max-w-full overflow-x-auto">
              <strong>🤖 AI:</strong>
              <div className="mt-3">{renderStructuredRoadmap()}</div>
            </div>
          </div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={handleCopy}
              className="bg-gray-300 dark:bg-gray-700 dark:text-white px-3 py-1.5 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              📋 Copy
            </button>

            <button
              onClick={exportPDF}
              className="bg-purple-600 text-white px-3 py-1.5 rounded hover:bg-purple-700 transition"
            >
              📄 Export PDF
            </button>

            <button
              onClick={() => {
                setGoal("");
                setRoadmap("");
                toast.info("Cleared successfully.");
              }}
              className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
            >
              ❌ Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
