import React, { useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Path from "../assets/Logo Start.png";
import Logo from "../assets/Careerpath Logo.png";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/auth/register", { name, email, password });
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-all">
      {/* Left - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <img src={Logo} alt="CareerPath AI" className="w-60 h-20 object-contain" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <div className="flex items-center mt-1 border rounded-lg px-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <FaUser className="text-gray-400" />
                <input
                  name="name"
                  autoComplete="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 py-2 outline-none bg-transparent text-gray-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="flex items-center mt-1 border rounded-lg px-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <HiOutlineMail className="text-gray-400" />
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-2 outline-none bg-transparent text-gray-900 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="flex items-center mt-1 border rounded-lg px-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <HiOutlineLockClosed className="text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-2 outline-none bg-transparent text-gray-900 dark:text-white"
                  placeholder="Create a strong password"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">Password must be at least 8 characters long.</p>
            </div>

            {/* Error */}
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Register
            </button>
          </form>

          {/* Link to Login */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>

          {/* Footer */}
          <p className="text-xs text-center text-gray-400 mt-6">
            © {new Date().getFullYear()} CareerPath AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right - Illustration Panel */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center px-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white leading-snug mb-6">
            Begin Your Journey Toward a <br />
            Brighter Future with <br />
            <span className="font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              CareerPath AI
            </span>
          </h2>
          <img
            src={Path}
            alt="CareerPath AI Illustration"
            className="w-72 md:w-96 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;