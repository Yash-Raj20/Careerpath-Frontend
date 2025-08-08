import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Path from "../assets/Logo Start.png";
import { toast } from "react-toastify";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/chat");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", { email, password });
      setUser(res.data.user);
      toast.success("Login successful!");
      navigate("/chat");
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-all">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-16">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2">
            <span className="mt-5 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back to CareerPath AI
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="flex items-center mt-1 border rounded-lg px-3 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <HiOutlineLockClosed className="text-gray-400" />
                <input
                  name="password"
                  autoComplete="current-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-2 outline-none bg-transparent text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" className="mr-2" />
              Remember me
              <span className="ml-2 text-xs text-gray-400">
                Save my login details for next time.
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-2">
            <span className="h-px w-full bg-gray-300 dark:bg-gray-600" />
            <span className="text-gray-400 text-sm">or</span>
            <span className="h-px w-full bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="flex items-center justify-center w-full border px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <FcGoogle className="mr-3" size={18} />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center w-full bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-[#155cc1] transition">
              <FaFacebookF className="mr-3" size={18} />
              Sign in with Facebook
            </button>
            <button className="flex items-center justify-center w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              <FaApple className="mr-3" size={18} />
              Sign in with Apple
            </button>
          </div>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>

          {/* Footer */}
          <p className="text-xs text-center text-gray-400 mt-6">
            © {new Date().getFullYear()} CareerPath AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center px-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white leading-snug mb-6">
            Explore Your Ideal Career Path with <br />
            Personalized AI Guidance <br />
            on{" "}
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

export default Login;
