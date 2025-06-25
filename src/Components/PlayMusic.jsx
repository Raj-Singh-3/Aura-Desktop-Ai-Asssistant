import React, { useState } from 'react';
import axios from 'axios';

const PlayMusic = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const searchSongs = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`https://saavn.dev/api/search/songs?query=${query}`);
      const results = response.data.data.results;
      setSongs(results);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-700 p-4 text-white">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">🎵 Bollywood Music Player</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search for a Bollywood song..."
            className="flex-1 p-2 rounded-md text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchSongs}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold"
          >
            Search
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {songs.map((song, index) => (
  <div
    key={index}
    className="bg-white text-black rounded-lg p-3 flex items-center justify-between shadow-md"
  >
    <div>
      <p className="font-semibold">{song.name}</p>
      <p className="text-sm text-gray-600">{song.primaryArtists}</p>
    </div>
    <button
      onClick={() => {
  if (song.downloadUrl && song.downloadUrl.length > 0) {
    const playable = song.downloadUrl[song.downloadUrl.length - 1].link;
    setCurrentSong(playable);
  } else {
    console.log(song); // debug
    alert('No playable audio link found.');
  }
}}

      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
    >
      ▶ Play
    </button>
  </div>
))}

        </div>

        {currentSong && (
          <div className="mt-10 text-center">
            <p className="text-xl font-semibold mb-2">Now Playing</p>
            <audio controls autoPlay className="w-full rounded-lg">
              <source src={currentSong} type="audio/mp4" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayMusic;
