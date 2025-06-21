// src/components/Music/MusicPlayer.jsx
import React, { useState, useRef } from 'react';

const MusicPlayer = ({ setBotStatus }) => {
  const [trackName, setTrackName] = useState('No track selected');
  const [artist, setArtist] = useState('Select music to play');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    audioRef.current.src = url;
    setTrackName(file.name);
    setArtist('Local File');
    setBotStatus(`🎵 Loaded: ${file.name}`);
    audioRef.current.load();
  };

  const togglePlayPause = () => {
    if (!audioRef.current.src) {
      setBotStatus('Please load a music file first.');
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setBotStatus('Paused');
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setBotStatus(`Playing: ${trackName}`);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#667eea] mb-4">🎵 Music Player</h2>

      <div className="text-5xl text-center mb-3">🎧</div>
      <div className="text-lg text-white text-center font-medium">{trackName}</div>
      <div className="text-[#a0a0ff] text-sm text-center mb-4">{artist}</div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-6">
        <div
          className={`h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300`}
          style={{ width: isPlaying ? '50%' : '0%' }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button className="music-btn" onClick={() => alert('Previous track')}>
          ⏮️
        </button>
        <button className="music-btn" onClick={togglePlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button className="music-btn" onClick={() => alert('Next track')}>
          ⏭️
        </button>
        <button className="music-btn" onClick={() => alert('Shuffling...')}>
          🔀
        </button>
      </div>

      {/* File Upload */}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="w-full p-2 bg-white/10 text-white border border-white/30 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#667eea] file:text-white hover:file:bg-[#5a67d8]"
      />

      <audio ref={audioRef} />
    </div>
  );
};

export default MusicPlayer;
