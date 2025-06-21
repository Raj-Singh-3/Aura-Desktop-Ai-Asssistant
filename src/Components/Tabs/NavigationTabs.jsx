import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Linkedin,
  Mail,
  Clock,
  Music,
  Youtube,
  FolderOpen,
  Camera,
} from "lucide-react";

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin },
    { id: "email", label: "Email", icon: Mail },
    { id: "alarm", label: "Alarms", icon: Clock },
    { id: "music", label: "Music", icon: Music },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "files", label: "Files", icon: FolderOpen },
    { id: "camera", label: "Camera", icon: Camera },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm border-t border-purple-500/30 p-4">
      <div className="flex justify-center space-x-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 min-w-[80px] ${
                isActive
                  ? "bg-purple-600/50 text-white border border-purple-400/50"
                  : "text-purple-300 hover:text-white hover:bg-purple-800/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <Icon
                className={`w-5 h-5 mb-1 ${
                  isActive ? "text-white" : "text-purple-300"
                }`}
              />
              <span className="text-xs font-medium">{tab.label}</span>

              {isActive && (
                <motion.div
                  className="absolute -bottom-1 w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 24 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;
