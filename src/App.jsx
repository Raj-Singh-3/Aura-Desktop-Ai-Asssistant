// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import VoiceRecognition from "./Components/Bot/VoiceRecognition";
// import LinkedInPost from "./Components/LinkedIn/LinkedInPost";
// import SendEmail from "./Components/Email/SendEmail";
// import SetAlarm from "./Components/Alarms/SetAlarm";
// import PlayMusic from "./Components/PlayMusic";
// import PlayYouTube from "./Components/PlayYouTube";
// import FileManager from "./Components/Files/FileManager";
// import ChatBot from "./Components/Bot/ChatBot";
// import BotAvatar from "./Components/Bot/BotAvatar";
// import NavigationTabs from "./Components/Tabs/NavigationTabs";
// import Camera from "./Components/Camera/camera";

// function App() {
//   const [activeTab, setActiveTab] = useState("chat");
//   const [isListening, setIsListening] = useState(false);
//   const [recognizedText, setRecognizedText] = useState("");
//   const [botState, setBotState] = useState("idle");

//   const tabComponents = {
//     linkedin: LinkedInPost,
//     email: SendEmail,
//     alarm: SetAlarm,
//     music: PlayMusic,
//     youtube: PlayYouTube,
//     files: FileManager,
//     chat: ChatBot,
//     camera: Camera,
//   };

//   const ActiveComponent = tabComponents[activeTab];

//   // Enhanced command mapping
//   const commandToTabMap = {
//     linkedin: "linkedin",
//     "linked in": "linkedin",
//     post: "linkedin",
//     email: "email",
//     mail: "email",
//     "send email": "email",
//     alarm: "alarm",
//     reminder: "alarm",
//     timer: "alarm",
//     music: "music",
//     "play music": "music",
//     song: "music",
//     youtube: "youtube",
//     "you tube": "youtube",
//     video: "youtube",
//     file: "files",
//     files: "files",
//     folder: "files",
//     documents: "files",
//     chat: "chat",
//     talk: "chat",
//     ask: "chat",
//   };

//   // Improved voice command handler
//   const handleVoiceCommand = (command) => {
//     const lowerCommand = command.toLowerCase().trim();
//     setRecognizedText(command);
//     setBotState("processing");

//     // Find the best matching command
//     let matchedTab = null;

//     // First check for exact matches
//     if (commandToTabMap[lowerCommand]) {
//       matchedTab = commandToTabMap[lowerCommand];
//     } else {
//       // Then check for partial matches
//       for (const [cmd, tab] of Object.entries(commandToTabMap)) {
//         if (lowerCommand.includes(cmd)) {
//           matchedTab = tab;
//           break;
//         }
//       }
//     }

//     // Special case for "open" commands
//     if (!matchedTab && lowerCommand.startsWith("open ")) {
//       const openCommand = lowerCommand.substring(5).trim();
//       matchedTab =
//         commandToTabMap[openCommand] ||
//         Object.entries(commandToTabMap).find(([cmd]) =>
//           openCommand.includes(cmd)
//         )?.[1];
//     }

//     if (matchedTab) {
//       setActiveTab(matchedTab);
//       setBotStatus(
//         `Switched to ${
//           tabs.find((t) => t.id === matchedTab)?.label || matchedTab
//         } tab`
//       );
//     } else {
//       setBotStatus(`Command not recognized: "${command}"`);
//     }

//     setTimeout(() => setBotState("idle"), 1000);
//   };

//   // Tab definitions moved here for better organization
//   const tabs = [
//     { id: "chat", label: "Chat" },
//     { id: "linkedin", label: "LinkedIn" },
//     { id: "email", label: "Email" },
//     { id: "alarm", label: "Alarms" },
//     { id: "music", label: "Music" },
//     { id: "youtube", label: "YouTube" },
//     { id: "files", label: "Files" },
//   ];

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Left Pane - Bot Avatar (30%) */}
//       <div className="w-[30%] flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm border-r border-purple-500/30">
//         <BotAvatar state={botState} isListening={isListening} />

//         <div className="mt-8 p-4 text-center">
//           <h1 className="text-2xl font-bold text-white mb-2">Aura</h1>
//           <p className="text-purple-300 text-sm mb-4">
//             Your Personal AI Desktop Companion
//           </p>

//           {recognizedText && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-purple-800/50 p-3 rounded-lg border border-purple-500/30"
//             >
//               <p className="text-white text-sm">"{recognizedText}"</p>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Right Pane - Main Content (70%) */}
//       <div className="w-[70%] flex flex-col">
//         {/* Main Content Area */}
//         <div className="flex-1 p-6 overflow-auto">
//           <ActiveComponent voiceCommand={recognizedText} />
//         </div>

//         {/* Bottom Navigation */}
//         <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//       </div>

//       {/* Voice Recognition Component */}
//       <VoiceRecognition
//         onVoiceCommand={handleVoiceCommand}
//         setIsListening={setIsListening}
//         setBotState={setBotState}
//       />
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";
import { motion } from "framer-motion";
import VoiceRecognition from "./Components/Bot/VoiceRecognition";
import LinkedInPost from "./Components/LinkedIn/LinkedInPost";
import SendEmail from "./Components/Email/SendEmail";
import SetAlarm from "./Components/Alarms/SetAlarm";
import PlayMusic from "./Components/PlayMusic";
import PlayYouTube from "./Components/PlayYouTube";
import FileManager from "./Components/Files/FileManager";
import ChatBot from "./Components/Bot/ChatBot";
import BotAvatar from "./Components/Bot/BotAvatar";
import NavigationTabs from "./Components/Tabs/NavigationTabs";
import Camera from "./Components/Camera/camera";

function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [botState, setBotState] = useState("idle");

  const tabs = [
    { id: "chat", label: "Chat" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "email", label: "Email" },
    { id: "alarm", label: "Alarms" },
    { id: "music", label: "Music" },
    { id: "youtube", label: "YouTube" },
    { id: "files", label: "Files" },
    { id: "camera", label: "Camera" },
  ];

  const tabComponents = {
    linkedin: LinkedInPost,
    email: SendEmail,
    alarm: SetAlarm,
    music: PlayMusic,
    youtube: PlayYouTube,
    files: FileManager,
    chat: ChatBot,
    camera: Camera,
  };

  const commandToTabMap = {
    linkedin: "linkedin",
    "linked in": "linkedin",
    post: "linkedin",
    email: "email",
    mail: "email",
    "send email": "email",
    alarm: "alarm",
    reminder: "alarm",
    timer: "alarm",
    music: "music",
    "play music": "music",
    song: "music",
    youtube: "youtube",
    "you tube": "youtube",
    video: "youtube",
    file: "files",
    files: "files",
    folder: "files",
    documents: "files",
    chat: "chat",
    talk: "chat",
    ask: "chat",
    camera: "camera",
    photo: "camera",
    picture: "camera",
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();
    setRecognizedText(command);
    setBotState("processing");

    let matchedTab = null;

    if (commandToTabMap[lowerCommand]) {
      matchedTab = commandToTabMap[lowerCommand];
    } else {
      for (const [cmd, tab] of Object.entries(commandToTabMap)) {
        if (lowerCommand.includes(cmd)) {
          matchedTab = tab;
          break;
        }
      }
    }

    if (!matchedTab && lowerCommand.startsWith("open ")) {
      const openCommand = lowerCommand.substring(5).trim();
      matchedTab =
        commandToTabMap[openCommand] ||
        Object.entries(commandToTabMap).find(([cmd]) =>
          openCommand.includes(cmd)
        )?.[1];
    }

    if (matchedTab) {
      setActiveTab(matchedTab);
      const tabLabel =
        tabs.find((t) => t.id === matchedTab)?.label || matchedTab;
      setBotStatus(`Switched to ${tabLabel} tab`);
      speakText(`Successfully opened ${tabLabel}`);
    } else {
      setBotStatus(`Command not recognized: "${command}"`);
    }

    setTimeout(() => setBotState("idle"), 1000);
  };

  const [botStatus, setBotStatus] = useState("");

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Left Pane - Bot Avatar */}
      <div className="w-[30%] flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm border-r border-purple-500/30">
        <BotAvatar state={botState} isListening={isListening} />

        <div className="mt-8 p-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Aura</h1>
          <p className="text-purple-300 text-sm mb-4">
            Your Personal AI Desktop Companion
          </p>

          {recognizedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-800/50 p-3 rounded-lg border border-purple-500/30"
            >
              <p className="text-white text-sm">"{recognizedText}"</p>
            </motion.div>
          )}

          {botStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-purple-400 text-xs"
            >
              {botStatus}
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Pane - Main Content */}
      <div className="w-[70%] flex flex-col">
        <div className="flex-1 p-6 overflow-auto">
          <ActiveComponent voiceCommand={recognizedText} />
        </div>

        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Voice Recognition */}
      <VoiceRecognition
        onVoiceCommand={handleVoiceCommand}
        setIsListening={setIsListening}
        setBotState={setBotState}
      />
    </div>
  );
}

export default App;
