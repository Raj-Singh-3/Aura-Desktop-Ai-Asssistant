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
