import React, { useState } from "react";
import axios from "../api/axios";
import { FaLightbulb } from "react-icons/fa";

const Courses = () => {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await axios.post("/course/recommend", { goal });
      setResult(res.data.reply);
    } catch (err) {
      console.error("Error fetching course suggestions:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto text-gray-900 dark:text-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center sm:text-left mb-8">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <FaLightbulb className="text-yellow-400 text-3xl" />
          <h1 className="text-3xl font-bold">🎯 Career Goal to Course Mapper</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Tell us your career goal, and we’ll recommend the best courses to reach it.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition"
      >
        <label htmlFor="goal" className="block text-sm font-medium mb-1">
          What’s your career goal?
        </label>
        <input
          id="goal"
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Frontend Developer, Data Analyst..."
          className="w-full p-3 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={!goal.trim() || loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition disabled:opacity-50"
        >
          {loading ? "🔄 Fetching Recommendations..." : "🚀 Get Course Suggestions"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-6 max-w-3xl mx-auto p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100 border border-red-300 dark:border-red-600 rounded-md">
          ❌ {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-2">
            🎓 Recommended Courses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {result
              .split(/\n\s*\n+/)
              .map((course, idx) => {
                const lines = course.trim().split("\n").filter(Boolean);
                const title =
                  lines[0]?.replace(/^\d+\.\s*/, "") || "Untitled Course";
                const details = lines.slice(1);

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300 mb-3">
                      {title}
                    </h3>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      {details.map((line, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span>📌</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;