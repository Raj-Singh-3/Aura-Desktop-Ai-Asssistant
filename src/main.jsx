// // import { StrictMode } from 'react'
// import React from "react";
// import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <div>
//     <App />
//   </div>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          {console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID)}
          <Route path="/app" element={<ProtectedRoute><App /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Add this ProtectedRoute component above or in a separate file:
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
}
