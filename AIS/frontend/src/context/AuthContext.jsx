"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returnUrl, setReturnUrl] = useState("/laptop");

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          // Optionally validate token with backend
          const userData = JSON.parse(localStorage.getItem("user") || "null");
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user || { username: credentials.username }));

      setUser(data.user || { username: credentials.username });
      setIsAuthenticated(true);
      setError("");

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setUser(null);
      setIsAuthenticated(false);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  const setReturnUrlPath = (path) => {
    setReturnUrl(path);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    returnUrl,
    login,
    logout,
    setReturnUrlPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
