// src/Login.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (token) {
      localStorage.setItem("token", token);
      navigate("/app");
    }
  };

  useEffect(() => {
    // If already logged in, redirect to app
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/app");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-900 to-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">Welcome to Aura</h1>
        <p className="mb-6 text-gray-600">Sign in to continue</p>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={() => alert("Login Failed")} />
      </div>
    </div>
  );
};

export default Login;
