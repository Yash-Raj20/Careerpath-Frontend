// src/App.js
import React, { lazy, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Chat = lazy(() => import("./pages/Chat"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Interview = lazy(() => import("./pages/Interview"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Profile = lazy(() => import("./pages/Profile"));
const Courses = lazy(() => import("./pages/Courses"));
const MockInterview = lazy(() => import("./pages/MockInterview"));

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* ✅ Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />

      {/* ✅ Show Navbar only if logged in */}
      {user && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
      )}

      {/* ✅ Main Page Content */}
      <div className={user ? "pt-[64px] flex-1 overflow-hidden" : "flex-1"}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/chat" : "/login"} replace />}
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/interview" element={<PrivateRoute><Interview /></PrivateRoute>} />
          <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
          <Route path="/mockinterview" element={<PrivateRoute><MockInterview /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;