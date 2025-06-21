// // src/components/Header/Header.jsx
// import React from 'react';

// const Header = ({ title }) => {
//   return (
//     <div className="w-full bg-gradient-to-r from-[#1e1e3f] to-[#2a2a5a] text-white px-6 py-3 flex items-center justify-between border-b border-white/20 shadow-sm">
//       {/* Title */}
//       <h1 className="text-xl font-semibold tracking-wide">{title}</h1>

//       {/* Optional Window Controls */}
//       <div className="flex gap-3">
//         <button
//           title="Minimize"
//           className="w-4 h-4 bg-yellow-400 rounded-full hover:scale-110 transition"
//         />
//         <button
//           title="Maximize"
//           className="w-4 h-4 bg-green-500 rounded-full hover:scale-110 transition"
//         />
//         <button
//           title="Close"
//           className="w-4 h-4 bg-red-500 rounded-full hover:scale-110 transition"
//         />
//       </div>
//     </div>
//   );
// };

// export default Header;
// src/components/Header/Header.jsx

// import React from 'react';

// const Header = ({ title }) => {
//   return (
//     <div className="w-full px-6 py-3 bg-gradient-to-r from-[#1e1e3f] to-[#2a2a5a] border-b border-white/20 flex items-center justify-between">
//       {/* Title */}
//       <h1 className="text-lg font-semibold text-white tracking-wide">{title}</h1>

//       {/* Fake window controls */}
//       <div className="flex gap-3">
//         <div title="Minimize" className="w-4 h-4 bg-yellow-400 rounded-full hover:scale-110 transition" />
//         <div title="Maximize" className="w-4 h-4 bg-green-500 rounded-full hover:scale-110 transition" />
//         <div title="Close" className="w-4 h-4 bg-red-500 rounded-full hover:scale-110 transition" />
//       </div>
//     </div>
//   );
// };

// export default Header;
import React from 'react';

const Header = ({ title }) => (
  <div className="w-full px-8 py-4 bg-gradient-to-r from-[#1e1e3f]/80 via-[#2a2a5a]/80 to-[#1e1e3f]/80 border-b border-white/10 flex items-center justify-between rounded-t-2xl shadow-lg backdrop-blur-md">
    {/* Title */}
    <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-md select-none">
      {title}
    </h2>
    {/* Window Controls */}
    <div className="flex gap-2">
      <button
        title="Minimize"
        className="w-4 h-4 bg-yellow-400 rounded-full shadow hover:scale-110 transition-transform border-2 border-yellow-300 focus:outline-none"
      />
      <button
        title="Maximize"
        className="w-4 h-4 bg-green-400 rounded-full shadow hover:scale-110 transition-transform border-2 border-green-300 focus:outline-none"
      />
      <button
        title="Close"
        className="w-4 h-4 bg-red-400 rounded-full shadow hover:scale-110 transition-transform border-2 border-red-300 focus:outline-none"
      />
    </div>
  </div>
);

export default Header;
