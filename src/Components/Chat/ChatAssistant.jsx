// src/components/Chat/ChatAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';

const ChatAssistant = ({ setBotStatus }) => {
  const [messages, setMessages] = useState([
    { id: 0, sender: 'bot', text: "Hello! I'm here to help. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const chatRef = useRef();

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages = [...messages, { id: Date.now(), sender: 'user', text: trimmed }];
    setMessages(newMessages);
    setInput('');
    setBotStatus(`You: ${trimmed}`);

    // Simulated bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `I understand you said "${trimmed}". How can I help you with that?`
        }
      ]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearChat = () => {
    setMessages([
      { id: 0, sender: 'bot', text: "Hello! I'm here to help. What would you like to know?" }
    ]);
    setBotStatus('Chat cleared');
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#667eea] mb-4">💬 Ask Questions</h2>

      <div
        ref={chatRef}
        className="max-h-80 overflow-y-auto mb-4 space-y-3 bg-white/5 p-4 rounded-lg"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-md max-w-[80%] ${
              msg.sender === 'bot'
                ? 'bg-white/10 text-white'
                : 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white ml-auto'
            }`}
          >
            <strong>{msg.sender === 'bot' ? 'Aura' : 'You'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea] mb-3"
      />

      <div className="flex gap-4">
        <button
          onClick={sendMessage}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-lg transition-all"
        >
          📤 Send
        </button>
        <button
          onClick={clearChat}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white hover:shadow-lg transition-all"
        >
          🗑️ Clear Chat
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
