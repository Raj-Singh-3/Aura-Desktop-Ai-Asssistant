// src/components/Tabs/TabContent.jsx

import React from 'react';
import LinkedInPost from '../LinkedIn/LinkedInPost';
import EmailSender from '../Email/EmailSender';
import AlarmManager from '../Alarms/AlarmManager';
import MusicPlayer from '../Music/MusicPlayer';
// import YouTubePlayer from '../YouTube/YouTubePlayer';
import ChatAssistant from '../Chat/ChatAssistant';
import FileManager from '../Files/FileManager';

const TabContent = ({ activeTab, setBotStatus }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {activeTab === 'linkedin' && <LinkedInPost setBotStatus={setBotStatus} />}
      {activeTab === 'email' && <EmailSender setBotStatus={setBotStatus} />}
      {activeTab === 'alarms' && <AlarmManager setBotStatus={setBotStatus} />}
      {activeTab === 'music' && <MusicPlayer setBotStatus={setBotStatus} />}
      {activeTab === 'youtube' && <YouTubePlayer setBotStatus={setBotStatus} />}
      {activeTab === 'chat' && <ChatAssistant setBotStatus={setBotStatus} />}
      {activeTab === 'files' && <FileManager setBotStatus={setBotStatus} />}
    </div>
  );
};

export default TabContent;
