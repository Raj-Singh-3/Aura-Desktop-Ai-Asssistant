// src/components/Email/EmailSender.jsx
import React, { useState } from "react";

const EmailSender = ({ setBotStatus }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = () => {
    if (!to || !subject || !message) {
      alert("Please fill in all fields!");
      setBotStatus("Missing email fields. Please complete them.");
      return;
    }

    // Simulate email send
    alert(`📧 Email Sent!\n\nTo: ${to}\nSubject: ${subject}\n\n${message}`);
    setBotStatus(`Email sent to ${to}`);
    clearForm();
  };

  const clearForm = () => {
    setTo("");
    setSubject("");
    setMessage("");
    setBotStatus("Email form cleared.");
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#667eea] mb-4">
        📧 Send Email
      </h2>

      <div className="mb-4">
        <label className="block text-[#a0a0ff] mb-2">To</label>
        <input
          type="email"
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
          placeholder="recipient@example.com"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#a0a0ff] mb-2">Subject</label>
        <input
          type="text"
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
          placeholder="Email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#a0a0ff] mb-2">Message</label>
        <textarea
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
          placeholder="Type your message here..."
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <button
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-xl transition-all"
          onClick={sendEmail}
        >
          📤 Send Email
        </button>
        <button
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white hover:shadow-xl transition-all"
          onClick={clearForm}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default EmailSender;
