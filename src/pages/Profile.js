import React, { useContext, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [newName, setNewName] = useState(user?.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-10 text-gray-900 dark:text-white">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <FaUserCircle className="text-6xl text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-2xl font-bold">👤 Your Profile</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View and update your account details
        </p>
      </div>

      {/* Profile Form */}
      <div className="space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg">
        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <div className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white text-sm">
            {user?.email}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-3 rounded border dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 rounded border dark:bg-gray-900 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Leave blank to keep current password"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Use at least 8 characters.
          </p>
        </div>

        {/* Update Button */}
        <button
          onClick={updateProfile}
          disabled={loading}
          className="w-full py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "⏳ Updating..." : "💾 Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default Profile;