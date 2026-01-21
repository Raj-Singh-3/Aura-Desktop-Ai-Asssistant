import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const SendEmail = () => {
  const [token, setToken] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const user = jwtDecode(storedToken);
        setUserEmail(user.email || "");
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  const handleSend = async () => {
    if (!recipient || !subject || !message || !token) {
      alert("❌ Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/send-email", {
        token,
        to: recipient,
        subject,
        message,
      });

      alert("✅ Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("❌ Failed to send email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-900 to-slate-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-8">Send an Email as {userEmail}</h1>
      <div className="w-full max-w-md space-y-4">
        <input
          type="email"
          placeholder="Recipient's Email"
          className="w-full p-3 rounded text-black"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 rounded text-black"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 rounded text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
