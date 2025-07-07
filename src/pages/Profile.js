import React, { useContext, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import {
  FaAward,
  FaBriefcase,
  FaCalendar,
  FaClock,
  FaEdit,
  FaKey,
  FaSave,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { FiActivity, FiLoader, FiZap } from "react-icons/fi";
import { MdInfoOutline, MdMailOutline } from "react-icons/md";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [newName, setNewName] = useState(user?.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.put("/user/update-profile", {
        name: newName,
        password: newPassword || undefined,
      });
      setUser(res.data);
      toast.success("✅ Profile updated successfully!");
      setNewPassword("");
    } catch (err) {
      toast.error("❌ Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const recentActivity = [
    {
      id: 1,
      type: "Interview Completed",
      details: "Frontend Developer (Advanced)",
      date: "2024-07-05",
      icon: <FaAward size={16} />,
    },
    {
      id: 2,
      type: "Settings Updated",
      details: "Changed theme to Dark Mode",
      date: "2024-07-04",
      icon: <FiZap size={16} />,
    },
    {
      id: 3,
      type: "Practice Session",
      details: "Data Structures & Algorithms",
      date: "2024-07-03",
      icon: <FaClock size={16} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white relative">
      <main className="flex-grow w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto space-y-10 animate-fade-in-up">
          {/* Profile Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center gap-4 border border-gray-200 dark:border-gray-700 text-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 dark:from-indigo-600 dark:to-purple-800 flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-700 overflow-hidden">
                <FaUserCircle className="text-white text-6xl" />
              </div>
              <button className="absolute bottom-1 right-1 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform duration-200">
                <FaEdit
                  size={16}
                  className="text-gray-600 dark:text-gray-300"
                />
              </button>
            </div>

            <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400">
              Hello, {user?.name || "User"}!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
              Manage your account settings and view your activity.
            </p>
          </div>

          {/* Profile Form + Activity Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Basic Info */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-600 space-y-5">
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 flex items-center gap-2">
                <MdInfoOutline size={24} /> Basic Information
              </h3>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <MdMailOutline size={16} /> Email:
                </label>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-500 shadow-sm">
                  {user?.email || "N/A"}
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <FaUser size={16} /> Name:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your full name"
                    disabled={!isEditingName}
                  />
                  <button
                    onClick={() => setIsEditingName(!isEditingName)}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                  >
                    <FaEdit size={18} />
                  </button>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-1">
                  <FaKey size={16} /> New Password:
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="Leave blank to keep current password"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use at least 8 characters for a strong password.
                </p>
              </div>

              {/* Update Button */}
              <button
                onClick={updateProfile}
                disabled={loading || (!isEditingName && !newPassword)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <FiLoader size={20} className="animate-spin" /> Updating...
                  </>
                ) : (
                  <>
                    <FaSave size={20} /> Save Changes
                  </>
                )}
              </button>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Membership */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-600 space-y-4">
                <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-300 flex items-center gap-2">
                  <FaAward size={24} /> Membership Details
                </h3>
                <div className="space-y-3 text-lg">
                  <div className="flex items-center gap-3">
                    <FaCalendar className="text-teal-500" />{" "}
                    <strong>Member Since:</strong>
                    <span className="text-gray-700 dark:text-gray-200">
                      {user?.memberSince
                        ? new Date(user.memberSince).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-teal-500" />{" "}
                    <strong>Last Login:</strong>
                    <span className="text-gray-700 dark:text-gray-200">
                      {user?.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiZap className="text-teal-500" />{" "}
                    <strong>Current Plan:</strong>
                    <span className="text-gray-700 dark:text-gray-200 font-semibold">
                      {user?.plan || "Free Tier"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBriefcase className="text-teal-500" />{" "}
                    <strong>Interviews Completed:</strong>
                    <span className="text-gray-700 dark:text-gray-200">
                      {user?.interviewsCompleted || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner border border-gray-200 dark:border-gray-600 space-y-4">
                <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-300 flex items-center gap-2">
                  <FiActivity size={24} /> Recent Activity
                </h3>
                {recentActivity.length > 0 ? (
                  <ul className="space-y-3">
                    {recentActivity.map((activity) => (
                      <li
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                      >
                        <div className="text-orange-500">{activity.icon}</div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-100">
                            {activity.type}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {activity.details}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.date}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No recent activity found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 text-center py-6 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <strong className="text-gray-900 dark:text-white">CareerPath AI</strong>{" "}
        — All rights reserved.
      </footer>
    </div>
  );
};

export default Profile;
