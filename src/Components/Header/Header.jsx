// src/components/Header/Header.jsx
import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="w-full bg-gradient-to-r from-[#1e1e3f] to-[#2a2a5a] text-white px-6 py-3 flex items-center justify-between border-b border-white/20 shadow-sm">
      {/* Title */}
      <h1 className="text-xl font-semibold tracking-wide">{title}</h1>

      {/* Optional Window Controls */}
      <div className="flex gap-3">
        <button
          title="Minimize"
          className="w-4 h-4 bg-yellow-400 rounded-full hover:scale-110 transition"
        />
        <button
          title="Maximize"
          className="w-4 h-4 bg-green-500 rounded-full hover:scale-110 transition"
        />
        <button
          title="Close"
          className="w-4 h-4 bg-red-500 rounded-full hover:scale-110 transition"
        />
      </div>
    </div>
  );
};

export default Header;
