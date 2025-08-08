import { useState } from "react";
import axios from "../api/axios";
import TreePhaseVisual from "../components/TreePhase";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import {
  FaMagic,
  FaBullseye,
  FaBolt,
  FaRegCopy,
  FaFileAlt,
  FaTrashAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";

export default function Road() {
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
    toast.success("📋 Road copied to clipboard!");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Career Roadmap for ${goal}`, 10, 10);
    doc.setFontSize(12);
    if (Array.isArray(roadmap)) {
      let y = 20;
      roadmap.forEach((phase, i) => {
        doc.text(`${i + 1}. ${phase.title} (${phase.duration || "N/A"})`, 10, y);
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

  const renderStructured = () => {
    if (!Array.isArray(roadmap)) {
      return (
        <div className="text-red-500 bg-white dark:bg-gray-900 p-4 rounded shadow">
          ❌ Invalid road format. Please try again.
        </div>
      );
    }
    return <TreePhaseVisual phases={roadmap} />;
  };

  const stats = [
    { icon: FaUsers, label: "Users Helped", value: "10,00+" },
    { icon: FaMapMarkedAlt, label: "Roads Created", value: "25,00+" },
    { icon: FaTrophy, label: "Success Rate", value: "95%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative overflow-hidden">
        {/* Decorative Background Circles */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-20 blur-xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                <FaMapMarkedAlt className="text-white w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Career Roadmap Assistant
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your career goals into an actionable roadmap with AI
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl text-center transform hover:scale-105 transition bg-white/50 dark:bg-gray-800/50 backdrop-blur border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <stat.icon className="text-white w-6 h-6" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <FaBullseye className="text-blue-600 w-6 h-6 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What's your career goal?
                </h2>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Frontend Developer, Data Scientist..."
                    className="w-full p-4 pr-12 rounded-xl border bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                  <FaMagic className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={loading || !goal.trim()}
                  className="w-full flex justify-center items-center py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating Your Roadmap...
                    </>
                  ) : (
                    <>
                      <FaBolt className="mr-2" />
                      Generate My Roadmap
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Loading / Output */}
          {loading && (
            <div className="text-center text-blue-600 dark:text-blue-300 mb-10">
              <div className="inline-flex items-center px-6 py-3 rounded-full animate-pulse bg-blue-100 dark:bg-blue-900">
                <div className="animate-spin h-4 w-4 mr-2 border-b-2 border-blue-600 rounded-full"></div>
                AI is crafting your personalized roadmap...
              </div>
            </div>
          )}

          {/* Output */}
          {roadmap && (
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white font-medium">
                Career Roadmap Chat
              </div>

              <div className="p-6 space-y-6">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow max-w-[90%]">
                    <div className="mb-1 font-medium">You</div>
                    <p>How do I become a {goal}?</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-2xl shadow max-w-full">
                    <div className="mb-3 font-medium">AI Assistant</div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                      <p className="mb-4">Here’s your personalized roadmap:</p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                        {renderStructured()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-4 border-t border-gray-300 dark:border-gray-600">
                  <button
                    onClick={handleCopy}
                    className="flex items-center px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    <FaRegCopy className="mr-2" /> Copy Roadmap
                  </button>

                  <button
                    onClick={exportPDF}
                    className="flex items-center px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300"
                  >
                    <FaFileAlt className="mr-2" /> Export PDF
                  </button>

                  <button
                    onClick={() => {
                      setGoal("");
                      setRoadmap("");
                      toast.info("Cleared successfully.");
                    }}
                    className="flex items-center px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300"
                  >
                    <FaTrashAlt className="mr-2" /> Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}