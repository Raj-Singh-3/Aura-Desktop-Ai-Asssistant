// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Send, Bot, User, Trash2 } from "lucide-react";

// const ChatBot = ({ voiceCommand }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm Aura, your personal AI assistant. How can I help you today?",
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (voiceCommand && voiceCommand.trim()) {
//       handleSendMessage(voiceCommand);
//     }
//   }, [voiceCommand]);

//   const generateBotResponse = (userMessage) => {
//     const message = userMessage.toLowerCase();

//     if (message.includes("hello") || message.includes("hi")) {
//       return "Hello there! I'm happy to chat with you. What would you like to know?";
//     } else if (message.includes("how are you")) {
//       return "I'm doing great! Thanks for asking. I'm here and ready to help you with anything you need.";
//     } else if (message.includes("time")) {
//       return `The current time is ${new Date().toLocaleTimeString()}.`;
//     } else if (message.includes("date")) {
//       return `Today is ${new Date().toLocaleDateString()}.`;
//     } else if (message.includes("weather")) {
//       return "I don't have access to real-time weather data, but you can check your local weather app or website for current conditions.";
//     } else if (message.includes("help")) {
//       return "I can help you with various tasks! Try asking me about the time, date, or use voice commands to access different features like LinkedIn posts, emails, alarms, music, and more.";
//     } else if (message.includes("linkedin")) {
//       return "I can help you create LinkedIn posts! Use the LinkedIn tab to compose and share your professional updates.";
//     } else if (message.includes("email")) {
//       return "Need to send an email? Switch to the Email tab and I'll help you compose and send messages.";
//     } else if (message.includes("music")) {
//       return "Want to listen to music? Head to the Music tab to play your favorite songs!";
//     } else if (message.includes("thank")) {
//       return "You're very welcome! I'm always here to help. Is there anything else you'd like to know?";
//     } else {
//       return "That's interesting! I'm still learning, but I'm here to help. You can ask me about time, weather, or use voice commands to access different features.";
//     }
//   };

//   const handleSendMessage = (messageText = inputText) => {
//     if (!messageText.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       text: messageText,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText("");
//     setIsTyping(true);

//     // Simulate bot thinking time
//     setTimeout(() => {
//       const botResponse = {
//         id: Date.now() + 1,
//         text: generateBotResponse(messageText),
//         sender: "bot",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botResponse]);
//       setIsTyping(false);
//     }, 1000 + Math.random() * 1000);
//   };

//   const clearChat = () => {
//     setMessages([
//       {
//         id: 1,
//         text: "Hello! I'm Aura, your personal AI assistant. How can I help you today?",
//         sender: "bot",
//         timestamp: new Date(),
//       },
//     ]);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/30">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//             <Bot className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-white font-semibold">Chat with Aura</h2>
//             <p className="text-purple-300 text-sm">AI Assistant</p>
//           </div>
//         </div>
//         <button
//           onClick={clearChat}
//           className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors"
//         >
//           <Trash2 className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <AnimatePresence>
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`flex ${
//                 message.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`flex items-start space-x-2 max-w-[80%] ${
//                   message.sender === "user"
//                     ? "flex-row-reverse space-x-reverse"
//                     : ""
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     message.sender === "user"
//                       ? "bg-blue-600"
//                       : "bg-gradient-to-r from-purple-500 to-pink-500"
//                   }`}
//                 >
//                   {message.sender === "user" ? (
//                     <User className="w-4 h-4 text-white" />
//                   ) : (
//                     <Bot className="w-4 h-4 text-white" />
//                   )}
//                 </div>
//                 <div
//                   className={`p-3 rounded-2xl ${
//                     message.sender === "user"
//                       ? "bg-blue-600 text-white"
//                       : "bg-black/50 text-white border border-purple-500/30"
//                   }`}
//                 >
//                   <p className="text-sm">{message.text}</p>
//                   <p className="text-xs opacity-70 mt-1">
//                     {message.timestamp.toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Trash2 } from "lucide-react";

const ChatBot = ({ voiceCommand }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Aura, your personal AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (voiceCommand && voiceCommand.trim()) {
      handleSendMessage(voiceCommand);
    }
  }, [voiceCommand]);

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
      return "Hello there! I'm happy to chat with you. What would you like to know?";
    } else if (message.includes("how are you")) {
      return "I'm doing great! Thanks for asking. I'm here and ready to help you with anything you need.";
    } else if (message.includes("time")) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (message.includes("date")) {
      return `Today is ${new Date().toLocaleDateString()}.`;
    } else if (message.includes("weather")) {
      return "I don't have access to real-time weather data, but you can check your local weather app or website for current conditions.";
    } else if (message.includes("help")) {
      return "I can help you with various tasks! Try asking me about the time, date, or use voice commands to access different features like LinkedIn posts, emails, alarms, music, and more.";
    } else if (message.includes("linkedin")) {
      return "I can help you create LinkedIn posts! Use the LinkedIn tab to compose and share your professional updates.";
    } else if (message.includes("email")) {
      return "Need to send an email? Switch to the Email tab and I'll help you compose and send messages.";
    } else if (message.includes("music")) {
      return "Want to listen to music? Head to the Music tab to play your favorite songs!";
    } else if (message.includes("thank")) {
      return "You're very welcome! I'm always here to help. Is there anything else you'd like to know?";
    } else {
      return "That's interesting! I'm still learning, but I'm here to help. You can ask me about time, weather, or use voice commands to access different features.";
    }
  };

  const handleSendMessage = (messageText = inputText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(messageText),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm Aura, your personal AI assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/30">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Chat with Aura</h2>
            <p className="text-purple-300 text-sm">AI Assistant</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user"
                      ? "bg-blue-600"
                      : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-black/50 text-white border border-purple-500/30"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-black/50 border border-purple-500/30 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-purple-500/30">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice command..."
            className="flex-1 bg-black/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-purple-400 text-xs mt-2 text-center">
          Press Enter to send • Use voice commands for quick access
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
