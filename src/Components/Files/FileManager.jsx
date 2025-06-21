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
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-[#667eea] mb-4">📁 File & Folder Operations</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => createItem('file')}
          className="btn-file"
        >
          📄 New File
        </button>
        <button
          onClick={() => createItem('folder')}
          className="btn-file"
        >
          📁 New Folder
        </button>
        <button
          onClick={deleteItem}
          className="btn-file bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e]"
        >
          🗑️ Delete
        </button>
        <button
          onClick={refresh}
          className="btn-file bg-gradient-to-r from-[#4ecdc4] to-[#44a08d]"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            className={`cursor-pointer p-4 rounded-lg border border-white/20 text-center transition-all ${
              selected === idx
                ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white scale-[1.02]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <div className="text-3xl mb-2">{getIcon(item)}</div>
            <div className="text-sm">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManager;
