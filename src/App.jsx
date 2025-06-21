// // import TabContent from './Components/Tabs/TabContent';

// // function App() {
// //   return 
// //   <TabContent activeTab={activeTab} setBotStatus={setBotStatus} />
// // ;
// // }

// // export default App;
// // src/App.jsx

// import React, { useState } from 'react';
// import BotSection from './Components/Bot/BotSection';
// // import Header from './Components/Header'; // Optional if you built window controls
// import TabContent from './Components/Tabs/TabContent';
// // import BottomTabs from './Components/Tabs/BottomTabs';

// const App = () => {
//   const [activeTab, setActiveTab] = useState('linkedin');
//   const [botStatus, setBotStatus] = useState('Ready to assist you');
//   const [isListening, setIsListening] = useState(false);

//   const tabs = [
//     { id: 'linkedin', label: 'LinkedIn', icon: '📝', title: 'LinkedIn Post Creator' },
//     { id: 'email', label: 'Email', icon: '📧', title: 'Email Composer' },
//     { id: 'alarms', label: 'Alarms', icon: '⏰', title: 'Alarm & Reminders' },
//     { id: 'music', label: 'Music', icon: '🎵', title: 'Music Player' },
//     { id: 'youtube', label: 'YouTube', icon: '📺', title: 'YouTube Player' },
//     { id: 'chat', label: 'Questions', icon: '💬', title: 'AI Assistant Chat' },
//     { id: 'files', label: 'Files', icon: '📁', title: 'File Manager' }
//   ];

//   const switchTab = (tabId) => {
//     setActiveTab(tabId);
//     const selectedTab = tabs.find(tab => tab.id === tabId);
//     setBotStatus(`${selectedTab?.label || 'Tab'} opened`);
//   };

//   const getCurrentTabTitle = () => {
//     const currentTab = tabs.find(tab => tab.id === activeTab);
//     return currentTab ? currentTab.title : 'Aura Assistant';
//   };

//   const handleVoiceCommand = (command) => {
//     const lower = command.toLowerCase();

//     const matchedTab = tabs.find(tab =>
//       lower.includes(tab.id) || lower.includes(tab.label.toLowerCase())
//     );

//     if (matchedTab) {
//       switchTab(matchedTab.id);
//     } else {
//       setBotStatus('Command not recognized');
//     }
//   };

//   return (
//     <div className="flex h-screen overflow-hidden text-white bg-[#1e1e3f] font-sans">
//       <BotSection
//         isListening={isListening}
//         botStatus={botStatus}
//         onStartListening={() => {
//           setIsListening(true);
//           setBotStatus('Listening...');
//         }}
//         onStopListening={() => {
//           setIsListening(false);
//           setBotStatus('Ready to assist you');
//         }}
//       />

//       <div className="flex flex-col flex-1 h-full">
        
//         {/* <Header title={getCurrentTabTitle()} /> */}

//         {/* Main Content Area */}
//         <div className="flex-1 overflow-y-auto">
//           <TabContent activeTab={activeTab} setBotStatus={setBotStatus} />
//         </div>

//         {/* Bottom Navigation Tabs */}
//         {/* <BottomTabs
//           tabs={tabs}
//           activeTab={activeTab}
//           onTabSwitch={switchTab}
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default App;

// src/App.jsx

import React, { useState } from 'react';
import BotSection from './components/Bot/BotSection';
import Header from './components/Header/Header';
import TabContent from './components/Tabs/TabContent';
import BottomTabs from './components/Tabs/BottomTabs';

const App = () => {
  const [activeTab, setActiveTab] = useState('linkedin');
  const [botStatus, setBotStatus] = useState('Say "Hello Aura" to get started');
  const [isListening, setIsListening] = useState(false);

  const tabs = [
    { id: 'linkedin', label: 'LinkedIn', icon: '📝', title: 'Create LinkedIn Post' },
    { id: 'email', label: 'Email', icon: '📧', title: 'Email Composer' },
    { id: 'alarms', label: 'Alarms', icon: '⏰', title: 'Alarm & Reminders' },
    { id: 'music', label: 'Music', icon: '🎵', title: 'Music Player' },
    { id: 'youtube', label: 'YouTube', icon: '📺', title: 'YouTube Player' },
    { id: 'chat', label: 'Questions', icon: '💬', title: 'AI Assistant Chat' },
    { id: 'files', label: 'Files', icon: '📁', title: 'File Manager' }
  ];

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    const selected = tabs.find((t) => t.id === tabId);
    setBotStatus(`${selected?.label} tab opened`);
  };

  const getCurrentTabTitle = () => {
    const current = tabs.find((t) => t.id === activeTab);
    return current ? current.title : 'Aura Assistant';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#1e1e3f] font-sans">
      <BotSection
        isListening={isListening}
        botStatus={botStatus}
        onStartListening={() => {
          setIsListening(true);
          setBotStatus('Listening...');
        }}
        onStopListening={() => {
          setIsListening(false);
          setBotStatus('Ready to assist you');
        }}
      />

      <div className="flex flex-col flex-1 h-full relative">
        <Header title={getCurrentTabTitle()} />

        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#1e1e3f] to-[#2a2a5a]">
          <h1 className="text-2xl font-semibold text-white mb-6">Welcome to Aura</h1>
          <TabContent activeTab={activeTab} setBotStatus={setBotStatus} />
        </div>

        <BottomTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabSwitch={switchTab}
        />
      </div>
    </div>
  );
};

export default App;
