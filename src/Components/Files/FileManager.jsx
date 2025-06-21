// src/components/Files/FileManager.jsx
import React, { useState } from 'react';

const FileManager = ({ setBotStatus }) => {
  const [items, setItems] = useState([
    { name: 'Documents', type: 'folder' },
    { name: 'Downloads', type: 'folder' },
    { name: 'report.docx', type: 'file' },
    { name: 'image.png', type: 'file' },
    { name: 'song.mp3', type: 'file' },
    { name: 'video.mp4', type: 'file' }
  ]);
  const [selected, setSelected] = useState(null);

  const createItem = (type) => {
    const name = prompt(`Enter ${type} name:`);
    if (!name) return;

    setItems([...items, { name, type }]);
    setBotStatus(`${type} "${name}" created`);
  };

  const deleteItem = () => {
    if (selected === null) {
      alert('Select an item to delete');
      return;
    }
    const item = items[selected];
    if (window.confirm(`Delete "${item.name}"?`)) {
      const newItems = [...items];
      newItems.splice(selected, 1);
      setItems(newItems);
      setSelected(null);
      setBotStatus(`Deleted: ${item.name}`);
    }
  };

  const refresh = () => {
    setBotStatus('File system refreshed');
    alert('🔄 Simulated file refresh');
  };

  const icons = {
    folder: '📁',
    file: '📄',
    mp3: '🎵',
    png: '🖼️',
    mp4: '📹'
  };

  const getIcon = (item) => {
    if (item.type === 'folder') return icons.folder;
    if (item.name.endsWith('.mp3')) return icons.mp3;
    if (item.name.endsWith('.png')) return icons.png;
    if (item.name.endsWith('.mp4')) return icons.mp4;
    return icons.file;
  };

  return (
    <div className="relative bg-gradient-to-br from-emerald-100/60 via-cyan-100/40 to-blue-100/30 border border-emerald-300/40 rounded-3xl p-10 shadow-2xl max-w-4xl mx-auto backdrop-blur-xl overflow-hidden">
      {/* Decorative background icon */}
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-emerald-200/40 to-cyan-300/30 rounded-full blur-2xl z-0" />
      <h2 className="text-3xl font-extrabold text-emerald-600 mb-8 flex items-center gap-2 z-10 relative drop-shadow-lg">📁 File & Folder Operations</h2>
      <div className="flex flex-wrap gap-3 mb-8 z-10 relative">
        <button
          onClick={() => createItem('file')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 text-white font-bold shadow-lg hover:shadow-emerald-400/40 hover:scale-105 transition-all duration-300 ring-2 ring-emerald-200/40 hover:ring-4 hover:ring-cyan-300/40"
        >
          📄 New File
        </button>
        <button
          onClick={() => createItem('folder')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 text-white font-bold shadow-lg hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300 ring-2 ring-cyan-200/40 hover:ring-4 hover:ring-emerald-300/40"
        >
          📁 New Folder
        </button>
        <button
          onClick={deleteItem}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 text-white font-bold shadow-lg hover:shadow-pink-400/40 hover:scale-105 transition-all duration-300 ring-2 ring-pink-200/40 hover:ring-4 hover:ring-red-300/40"
        >
          🗑️ Delete
        </button>
        <button
          onClick={refresh}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-white font-bold shadow-lg hover:shadow-blue-400/40 hover:scale-105 transition-all duration-300 ring-2 ring-blue-200/40 hover:ring-4 hover:ring-cyan-300/40"
        >
          🔄 Refresh
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 z-10 relative">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            className={`cursor-pointer p-6 rounded-2xl border-2 text-center transition-all duration-300 shadow-lg select-none font-semibold text-lg ${selected === idx
                ? 'bg-gradient-to-r from-emerald-200 via-cyan-200 to-blue-200 text-emerald-900 scale-105 ring-4 ring-emerald-400 border-emerald-400'
                : 'bg-white/60 text-emerald-800 border-emerald-200 hover:bg-emerald-100/60 hover:scale-105'
              }`}
          >
            <div className="text-4xl mb-2 drop-shadow-lg">{getIcon(item)}</div>
            <div className="text-base font-bold truncate">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;
