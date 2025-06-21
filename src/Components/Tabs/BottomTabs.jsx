// // src/components/Tabs/BottomTabs.jsx

// import React from "react";

// const BottomTabs = ({ tabs, activeTab, onTabSwitch }) => {
//   return (
//     <div className="w-full bg-gradient-to-t from-[#1e1e3f] to-[#2a2a5a] border-t border-white/20 px-3 py-2 flex justify-around items-center">
//       {tabs.map((tab) => (
//         <button
//           key={tab.id}
//           title={tab.title}
//           onClick={() => onTabSwitch(tab.id)}
//           className={`flex flex-col items-center px-3 py-1 rounded-md transition-all duration-300 ${
//             activeTab === tab.id
//               ? "bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white scale-105 shadow-md"
//               : "text-white/70 hover:text-white hover:bg-white/10"
//           }`}
//         >
//           <div className="text-xl">{tab.icon}</div>
//           <span className="text-xs font-medium">{tab.label}</span>
//         </button>
//       ))}
//     </div>
//   );
// };

// export default BottomTabs;
import React from "react";
const BottomTabs = ({ tabs, activeTab, onTabSwitch }) => {
  return (
    <div className="relative">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f2a] via-[#1a1a3a]/80 to-transparent pointer-events-none"></div>

      <div className="relative bg-[#1a1a3a]/90 backdrop-blur-xl border-t border-white/10 px-4 py-4">
        {/* Active tab indicator background */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>

        <div className="flex justify-around items-center max-w-6xl mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                title={tab.title}
                onClick={() => onTabSwitch(tab.id)}
                className={`group relative flex flex-col items-center px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "text-white scale-105"
                    : "text-white/60 hover:text-white/90"
                }`}
              >
                {/* Active tab background with enhanced glow */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-2xl blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl border border-white/20 shadow-lg"></div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/0"></div>
                  </>
                )}

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Enhanced icon with glow effect */}
                  <div
                    className={`text-2xl mb-1 transition-all duration-300 ${
                      isActive
                        ? "drop-shadow-lg filter brightness-110"
                        : "group-hover:scale-110 group-hover:brightness-110"
                    }`}
                  >
                    {tab.icon}
                  </div>

                  {/* Enhanced label */}
                  <span
                    className={`text-xs font-medium tracking-wide transition-all duration-300 ${
                      isActive ? "font-semibold" : "group-hover:font-medium"
                    }`}
                  >
                    {tab.label}
                  </span>

                  {/* Active indicator dot with pulse animation */}
                  {isActive && (
                    <div className="absolute -top-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
                  )}
                </div>

                {/* Enhanced ripple effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-200"></div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Enhanced bottom accent */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};
export default BottomTabs;
