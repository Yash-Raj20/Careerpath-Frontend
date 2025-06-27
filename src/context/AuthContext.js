// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";

// Create context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/profile");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed");
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
