import React, { useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import {
  FaLightbulb,
  FaGraduationCap,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaBookOpen,
  FaClock,
  FaStar,
  FaPlay,
  FaShareAlt,
  FaHeart,
  FaSearch,
  FaArrowRight,
  FaCheck,
  FaFire,
  FaTrophy,
  FaCode,
  FaDatabase,
  FaPalette,
  FaChartBar,
  FaShieldAlt,
  FaGlobe,
  FaComments,
  FaExclamationTriangle,
} from "react-icons/fa";

const Courses = () => {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal.trim()) {
      toast.warn("Please enter a career goal first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await axios.post("/course/recommend", { goal });
      setResult(res.data.reply);
      toast.success("Course recommendations fetched successfully!");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      toast.error("Failed to fetch course recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: FaUsers,
      label: "Students Enrolled",
      value: "2.5M+",
      color: "text-blue-500",
    },
    {
      icon: FaBookOpen,
      label: "Courses Available",
      value: "15,000+",
      color: "text-green-500",
    },
    {
      icon: FaTrophy,
      label: "Success Rate",
      value: "92%",
      color: "text-yellow-500",
    },
    {
      icon: FaChartLine,
      label: "Career Growth",
      value: "85%",
      color: "text-purple-500",
    },
  ];

  const popularGoals = [
    { icon: FaCode, title: "Frontend Developer", color: "bg-blue-500" },
    { icon: FaDatabase, title: "Data Scientist", color: "bg-green-500" },
    { icon: FaPalette, title: "UI/UX Designer", color: "bg-pink-500" },
    { icon: FaChartBar, title: "Digital Marketer", color: "bg-orange-500" },
    { icon: FaShieldAlt, title: "Cybersecurity", color: "bg-red-500" },
    { icon: FaGlobe, title: "Full Stack Developer", color: "bg-purple-500" },
  ];

  const features = [
    {
      icon: FaRocket,
      title: "AI-Powered Recommendations",
      desc: "Get personalized course suggestions based on your goals",
    },
    {
      icon: FaClock,
      title: "Time-Optimized Learning",
      desc: "Courses designed to fit your schedule and pace",
    },
    {
      icon: FaTrophy,
      title: "Industry-Recognized",
      desc: "Certificates from top universities and companies",
    },
    {
      icon: FaComments,
      title: "Community Support",
      desc: "Connect with learners and mentors worldwide",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
                <FaLightbulb className="text-yellow-400 text-3xl" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Career Goal to Course Mapper
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your career aspirations into actionable learning paths
              with AI-powered course recommendations
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <stat.icon className={`text-2xl ${stat.color}`} />
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

          {/* Main Form Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <FaGraduationCap className="text-indigo-600 text-xl mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    What's your career goal?
                  </h2>
                </div>

                <div className="relative">
                  <input
                    id="goal"
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Frontend Developer, Data Analyst, UX Designer..."
                    className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                  <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!goal.trim() || loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Fetching Recommendations...
                      </>
                    ) : (
                      <>
                        <FaRocket className="mr-2" />
                        Get Course Suggestions
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-6 py-3 rounded-full animate-pulse">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                AI is finding the perfect courses for you...
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-xl p-4 text-red-700 dark:text-red-200">
                <div className="flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  {error}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="max-w-7xl mx-auto mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  <FaGraduationCap className="inline mr-2 text-indigo-600" />
                  Recommended Courses
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Carefully selected courses to help you achieve your career
                  goals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.split(/\n\s*\n+/).map((course, idx) => {
                  const lines = course.trim().split("\n").filter(Boolean);
                  const title =
                    lines[0]?.replace(/^\d+\.\s*/, "") || "Untitled Course";
                  const details = lines.slice(1);

                  return (
                    <div
                      key={idx}
                      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                            <FaBookOpen className="text-white text-sm" />
                          </div>
                          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                            <FaFire className="inline mr-1" />
                            Popular
                          </div>
                        </div>
                        <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        {details.map((line, i) => (
                          <div
                            key={i}
                            className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                          >
                            <FaCheck className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>4.7</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <FaShareAlt className="text-gray-600 dark:text-gray-400 text-sm" />
                          </button>
                          <button className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                            <FaPlay className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Popular Goals */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Popular Career Goals
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularGoals.map((goal, index) => (
                <div
                  key={index}
                  onClick={() => setGoal(goal.title)}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center cursor-pointer transform hover:scale-105 transition-all duration-300 group"
                >
                  <div
                    className={`${goal.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <goal.icon className="text-white text-lg" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {goal.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why Choose Our Platform?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-white text-lg" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h3>
              <p className="text-indigo-100 mb-6">
                Join millions of learners who have transformed their careers
              </p>
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Today
                <FaArrowRight className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 mt-16 text-center py-6 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} {" "}
        <strong className="text-gray-900 dark:text-white">CareerPath AI</strong>{" "}
        — All rights reserved.
      </footer>
    </div>
  );
};

export default Courses;
