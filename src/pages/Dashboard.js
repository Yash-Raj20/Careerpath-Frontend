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

  // Fetch dashboard data
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
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        📊 Dashboard Insights
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
            🧠 Last Interview Role
          </h3>
          <p className="text-gray-800 dark:text-white">
            {data.interviewHistory.length > 0
              ? data.interviewHistory.slice(-1)[0]
              : "No interviews yet"}
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
            📄 Resume Uploaded
          </h3>
          <p className="text-gray-800 dark:text-white">
            {data.lastResumeUploaded ? "✅ Yes" : "❌ No"}
          </p>
        </div>

        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
            🎯 Career Goal
          </h3>
          <p className="text-gray-800 dark:text-white">
            {data.lastCourseGoal || "No course goal yet"}
          </p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">
            📈 Interview Attempts by Role
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
              <XAxis
                dataKey="role"
                stroke="#8884d8"
                tick={{ fill: "#4B5563" }}
              />
              <YAxis stroke="#8884d8" tick={{ fill: "#4B5563" }} />
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
  );
};

export default Dashboard;