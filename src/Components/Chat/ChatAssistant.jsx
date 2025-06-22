// // src/components/Chat/ChatAssistant.jsx
// import React, { useState, useRef, useEffect } from 'react';

// const ChatAssistant = ({ setBotStatus }) => {
//   const [messages, setMessages] = useState([
//     { id: 0, sender: 'bot', text: "Hello! I'm here to help. What would you like to know?" }
//   ]);
//   const [input, setInput] = useState('');
//   const chatRef = useRef();

//   const sendMessage = () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     const newMessages = [...messages, { id: Date.now(), sender: 'user', text: trimmed }];
//     setMessages(newMessages);
//     setInput('');
//     setBotStatus(`You: ${trimmed}`);

//     // Simulated bot reply
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           sender: 'bot',
//           text: `I understand you said "${trimmed}". How can I help you with that?`
//         }
//       ]);
//     }, 800);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   const clearChat = () => {
//     setMessages([
//       { id: 0, sender: 'bot', text: "Hello! I'm here to help. What would you like to know?" }
//     ]);
//     setBotStatus('Chat cleared');
//   };

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="relative bg-gradient-to-br from-cyan-100/60 via-teal-100/40 to-blue-100/30 border border-cyan-300/40 rounded-3xl p-10 shadow-2xl max-w-2xl mx-auto backdrop-blur-xl overflow-hidden">
//       {/* Decorative background icon */}
//       <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-cyan-200/40 to-teal-300/30 rounded-full blur-2xl z-0" />
//       <h2 className="text-3xl font-extrabold text-cyan-600 mb-8 flex items-center gap-2 z-10 relative drop-shadow-lg">💬 Ask Questions</h2>
//       <div
//         ref={chatRef}
//         className="max-h-80 overflow-y-auto mb-8 space-y-3 bg-white/40 p-4 rounded-xl shadow-inner z-10 relative"
//       >
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`p-4 rounded-xl max-w-[80%] shadow-md transition-all duration-300 font-medium text-base ${msg.sender === 'bot'
//                 ? 'bg-gradient-to-r from-cyan-100/80 to-blue-100/80 text-cyan-900'
//                 : 'bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 text-white ml-auto'
//               }`}
//           >
//             <strong>{msg.sender === 'bot' ? 'Aura' : 'You'}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Ask me anything..."
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={handleKeyDown}
//         className="w-full p-3 bg-white/60 text-cyan-900 border border-cyan-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-6 transition-all placeholder-cyan-400/70 shadow-inner z-10 relative"
//       />
//       <div className="flex gap-4 z-10 relative">
//         <button
//           onClick={sendMessage}
//           className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 text-white font-bold shadow-lg hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300 ring-2 ring-cyan-200/40 hover:ring-4 hover:ring-teal-300/40"
//         >
//           📤 Send
//         </button>
//         <button
//           onClick={clearChat}
//           className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-300 via-cyan-200 to-blue-200 text-cyan-900 font-bold shadow-lg hover:shadow-pink-300/40 hover:scale-105 transition-all duration-300 ring-2 ring-pink-100/40 hover:ring-4 hover:ring-cyan-200/40"
//         >
//           🗑️ Clear Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatAssistant;
