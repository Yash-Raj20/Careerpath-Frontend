import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../context/AuthContext";
import { FaChartBar, FaRegFileAlt, FaBullseye } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";

const Dashboard = () => {
  const { user, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    interviewHistory: [],
    lastResumeUploaded: false,
    lastCourseGoal: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) return navigate("/login");

    const fetchData = async () => {
      try {
        const res = await axios.get("/user/dashboard");
        const {
          interviewHistory = [],
          lastResumeUploaded = false,
          lastCourseGoal = "",
        } = res.data;

        setData({
          interviewHistory: Array.isArray(interviewHistory)
            ? interviewHistory
            : [],
          lastResumeUploaded: !!lastResumeUploaded,
          lastCourseGoal,
        });
        setError("");
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Something went wrong while loading your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authLoading, user, navigate]);

  const chartData = Array.isArray(data.interviewHistory)
    ? Object.entries(
        data.interviewHistory.reduce((acc, role) => {
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {})
      ).map(([role, count]) => ({ role, count }))
    : [];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-8 sm:px-6 lg:px-12 text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-center gap-3">
            <FaChartBar size={32} /> Dashboard Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Get a quick overview of your AI interview progress and career goals.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-300">
              <BsClockHistory size={24} />
              <h3 className="text-xl font-semibold">Last Interview Role</h3>
            </div>
            <p className="text-lg font-medium">
              {data.interviewHistory.length > 0
                ? data.interviewHistory.slice(-1)[0]
                : "No interviews yet"}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3 text-green-600 dark:text-green-300">
              <FaRegFileAlt size={24} />
              <h3 className="text-xl font-semibold">Resume Uploaded</h3>
            </div>
            <p className="text-lg font-medium">
              {data.lastResumeUploaded ? "✅ Yes" : "❌ No"}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3 text-purple-600 dark:text-purple-300">
              <FaBullseye size={24} />
              <h3 className="text-xl font-semibold">Career Goal</h3>
            </div>
            <p className="text-lg font-medium">
              {data.lastCourseGoal || "No goal set yet"}
            </p>
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-center mb-6 text-indigo-600 dark:text-indigo-400">
              📈 Interview Attempts by Role
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartData.length ? "#ccc" : "#999"}
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="role"
                  stroke="#8884d8"
                  tick={{ fill: "#4B5563", fontSize: 14 }}
                />
                <YAxis stroke="#8884d8" tick={{ fill: "#4B5563", fontSize: 14 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;