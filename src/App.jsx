import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VoiceRecognition from "./Components/Bot/VoiceRecognition";
import LinkedInPost from "./Components/LinkedIn/LinkedInPost";
import SendEmail from "./Components/Email/SendEmail";
import SetAlarm from "./Components/Alarms/SetAlarm";
import PlayMusic from "./Components/PlayMusic";
import PlayYouTube from "./Components/PlayYouTube";
import FileManager from "./Components/Files/FileManager";
// import CameraAccess from './components/CameraAccess';
import ChatBot from "./Components/Bot/ChatBot";
import BotAvatar from "./Components/Bot/BotAvatar";
import NavigationTabs from "./Components/Tabs/NavigationTabs";

function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [botState, setBotState] = useState("idle"); // idle, listening, speaking, processing

  const tabComponents = {
    linkedin: LinkedInPost,
    email: SendEmail,
    alarm: SetAlarm,
    music: PlayMusic,
    youtube: PlayYouTube,
    files: FileManager,
    // camera: CameraAccess,
    chat: ChatBot,
  };

  const ActiveComponent = tabComponents[activeTab];

  const handleVoiceCommand = (command) => {
    setRecognizedText(command);
    setBotState("processing");

    // Route voice commands to appropriate components
    const lowerCommand = command.toLowerCase();

    if (lowerCommand.includes("linkedin") || lowerCommand.includes("post")) {
      setActiveTab("linkedin");
    } else if (
      lowerCommand.includes("email") ||
      lowerCommand.includes("mail")
    ) {
      setActiveTab("email");
    } else if (
      lowerCommand.includes("alarm") ||
      lowerCommand.includes("reminder")
    ) {
      setActiveTab("alarm");
    } else if (
      lowerCommand.includes("music") ||
      lowerCommand.includes("play song")
    ) {
      setActiveTab("music");
    } else if (
      lowerCommand.includes("youtube") ||
      lowerCommand.includes("video")
    ) {
      setActiveTab("youtube");
    } else if (
      lowerCommand.includes("file") ||
      lowerCommand.includes("folder")
    ) {
      setActiveTab("files");
    } else if (
      lowerCommand.includes("camera") ||
      lowerCommand.includes("photo")
    ) {
      setActiveTab("camera");
    }

    setTimeout(() => setBotState("idle"), 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Left Pane - Bot Avatar (30%) */}
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
        </div>
      </div>

      {/* Right Pane - Main Content (70%) */}
      <div className="w-[70%] flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <ActiveComponent voiceCommand={recognizedText} />
        </div>

        {/* Bottom Navigation */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Voice Recognition Component */}
      <VoiceRecognition
        onVoiceCommand={handleVoiceCommand}
        setIsListening={setIsListening}
        setBotState={setBotState}
      />
    </div>
  );
}

export default App;
