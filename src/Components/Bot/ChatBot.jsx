// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Send, Bot, User, Trash2 } from "lucide-react";
// import OpenAI from "openai";
// import { Mic, MicOff } from "lucide-react";

// const ChatBot = ({ voiceCommand }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm Aura, powered by DeepSeek v3. How can I assist you today?",
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const messagesEndRef = useRef(null);
//   const [isListening, setIsListening] = useState(false);

//   // Initialize OpenAI client
//   const openai = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
//     defaultHeaders: {
//       "HTTP-Referer": window.location.href,
//       "X-Title": "Aura AI Assistant",
//     },
//     dangerouslyAllowBrowser: true, // Required for client-side usage
//   });

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

//   const queryDeepSeekAI = async (prompt) => {
//     setIsTyping(true);
//     setApiError(null);

//     try {
//       const completion = await openai.chat.completions.create({
//         model: "deepseek/deepseek-v3-base:free",
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are Aura, a helpful AI assistant. Respond concisely and helpfully.",
//           },
//           ...messages
//             .filter((m) => m.sender === "bot")
//             .map((m) => ({
//               role: "assistant",
//               content: m.text,
//             })),
//           ...messages
//             .filter((m) => m.sender === "user")
//             .map((m) => ({
//               role: "user",
//               content: m.text,
//             })),
//           {
//             role: "user",
//             content: prompt,
//           },
//         ],
//         temperature: 0.7,
//         max_tokens: 1000,
//       });

//       return completion.choices[0]?.message?.content;
//     } catch (error) {
//       console.error("API Error:", error);
//       setApiError(error.message);
//       return "Sorry, I encountered an error processing your request. Please try again.";
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   const handleSendMessage = async (messageText = inputText) => {
//     if (!messageText.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       text: messageText,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText("");

//     const botResponse = await queryDeepSeekAI(messageText);

//     const newBotMessage = {
//       id: Date.now() + 1,
//       text: botResponse,
//       sender: "bot",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, newBotMessage]);
//   };

//   const clearChat = () => {
//     setMessages([
//       {
//         id: 1,
//         text: "Hello! I'm Aura, powered by DeepSeek v3. How can I assist you today?",
//         sender: "bot",
//         timestamp: new Date(),
//       },
//     ]);
//     setApiError(null);
//   };
//   // const toggleMic = () => {
//   //   setIsListening((prev) => !prev);
//   // };
//   const toggleMic = () => {
//     const recognition = recognitionRef.current;
//     if (!recognition) return;

//     if (isListening) {
//       recognition.stop();
//     } else {
//       recognition.start();
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       const recognition = new SpeechRecognition();
//       recognition.continuous = true;
//       recognition.interimResults = false;
//       recognition.lang = "en-US";

//       recognition.onstart = () => {
//         setIsListening(true);
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//       };

//       recognition.onresult = (event) => {
//         const transcript = Array.from(event.results)
//           .map((result) => result[0].transcript)
//           .join("");
//         console.log("Voice input:", transcript);
//         handleSendMessage(transcript);
//       };

//       recognition.onerror = (event) => {
//         console.error("Voice recognition error:", event.error);
//         setIsListening(false);
//       };

//       recognitionRef.current = recognition;
//     } else {
//       console.warn("Speech recognition not supported");
//     }
//   }, []);

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
//             <p className="text-purple-300 text-sm">Powered by DeepSeek v3</p>
//           </div>
//         </div>
//         <button
//           onClick={clearChat}
//           className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors"
//           title="Clear conversation"
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

//         {isTyping && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-start"
//           >
//             <div className="flex items-start space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                 <Bot className="w-4 h-4 text-white" />
//               </div>
//               <div className="bg-black/50 border border-purple-500/30 p-3 rounded-2xl">
//                 <div className="flex space-x-1">
//                   {[...Array(3)].map((_, i) => (
//                     <motion.div
//                       key={i}
//                       className="w-2 h-2 bg-purple-400 rounded-full"
//                       animate={{
//                         y: [0, -8, 0],
//                         opacity: [0.5, 1, 0.5],
//                       }}
//                       transition={{
//                         duration: 0.8,
//                         repeat: Infinity,
//                         delay: i * 0.2,
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {apiError && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-red-900/50 border border-red-500/30 text-red-200 p-3 rounded-lg text-sm"
//           >
//             API Error: {apiError}
//           </motion.div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="p-4 border-t border-purple-500/30">
//         <div className="flex space-x-2 items-center">
//           <input
//             type="text"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your message or use voice command..."
//             className="flex-1 bg-black/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
//             disabled={isTyping}
//           />
//           {/* 🎤 Mic Button */}
//           <button
//             onClick={toggleMic}
//             className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
//               isListening
//                 ? "bg-red-600 text-white"
//                 : "bg-gray-700 text-purple-300 hover:bg-purple-600"
//             }`}
//             title={isListening ? "Stop Listening" : "Start Listening"}
//           >
//             {isListening ? (
//               <MicOff className="w-5 h-5" />
//             ) : (
//               <Mic className="w-5 h-5" />
//             )}
//           </button>
//           <button
//             onClick={() => handleSendMessage()}
//             disabled={!inputText.trim() || isTyping}
//             className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 hover:scale-105"
//             title="Send message"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//         <p className="text-purple-400 text-xs mt-2 text-center">
//           Press Enter to send • Powered by DeepSeek v3
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Trash2, Mic, MicOff } from "lucide-react";
import OpenAI from "openai";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Aura, powered by DeepSeek v3. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": window.location.href,
      "X-Title": "Aura AI Assistant",
    },
    dangerouslyAllowBrowser: true,
  });

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      console.warn("Speech recognition not ready");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      console.log("Transcript:", transcript);
      handleSendMessage(transcript);
      recognition.stop();
    };

    recognitionRef.current = recognition;
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const queryDeepSeekAI = async (prompt) => {
    setIsTyping(true);
    setApiError(null);

    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-v3-base:free",
        messages: [
          {
            role: "system",
            content:
              "You are Aura, a helpful AI assistant. Respond concisely and helpfully.",
          },
          ...messages
            .filter((m) => m.sender === "bot")
            .map((m) => ({
              role: "assistant",
              content: m.text,
            })),
          ...messages
            .filter((m) => m.sender === "user")
            .map((m) => ({
              role: "user",
              content: m.text,
            })),
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      return completion.choices[0]?.message?.content;
    } catch (error) {
      console.error("API Error:", error);
      setApiError(error.message);
      return "Sorry, I encountered an error processing your request. Please try again.";
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (messageText = inputText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const botResponse = await queryDeepSeekAI(messageText);

    const newBotMessage = {
      id: Date.now() + 1,
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newBotMessage]);

    // 🗣 Speak the bot response
    speakText(botResponse);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm Aura, powered by DeepSeek v3. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setApiError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/30">
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Chat with Aura</h2>
            <p className="text-purple-300 text-sm">Powered by DeepSeek v3</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors"
          title="Clear conversation"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

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
                      animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
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

        {apiError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/50 border border-red-500/30 text-red-200 p-3 rounded-lg text-sm"
          >
            API Error: {apiError}
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-purple-500/30">
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice command..."
            className="flex-1 bg-black/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
            disabled={isTyping}
          />
          <button
            onClick={toggleMic}
            className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
              isListening
                ? "bg-red-600 text-white"
                : "bg-gray-700 text-purple-300 hover:bg-purple-600"
            }`}
            title={isListening ? "Stop Listening" : "Start Listening"}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 hover:scale-105"
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-purple-400 text-xs mt-2 text-center">
          Press Enter to send • Powered by DeepSeek v3
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
