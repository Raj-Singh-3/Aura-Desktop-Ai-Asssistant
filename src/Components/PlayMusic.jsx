import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Play, Music, Volume2, Pause } from 'lucide-react';

const PlayMusic = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const filteredSongs = songs.filter(song => 
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const playSong = (songPath) => {
    const fileName = songPath.split('\\').pop();
    setCurrentSong(`http://localhost:5000/api/songs/${encodeURIComponent(fileName)}`);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce">
              <Music className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SoundWave
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Your Personal Music Experience</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search your music library..."
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Music Library */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Volume2 className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Your Music Library</h2>
            <span className="ml-auto bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
              {filteredSongs.length} songs
            </span>
          </div>
          
          {filteredSongs.length === 0 ? (
            <div className="text-center py-12">
              <Music className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg">No songs found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
              {filteredSongs.map((song, index) => (
                <div
                  key={index}
                  className="group bg-white/5 hover:bg-white/15 rounded-xl p-4 flex items-center justify-between transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-purple-500/30"
                  onClick={() => playSong(song.path)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors duration-300">
                        {song.name}
                      </p>
                      <p className="text-gray-400 text-sm">Track {index + 1}</p>
                    </div>
                  </div>
                  <button
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSong(song.path);
                    }}
                  >
                    <Play className="w-4 h-4" />
                    Play
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Now Playing */}
        {currentSong && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse">
                <Volume2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-white">Now Playing</h2>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">LIVE</span>
              </div>
            </div>
            <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
              <audio
                controls
                autoPlay
                className="w-full h-12 bg-transparent [&::-webkit-media-controls-panel]:bg-transparent [&::-webkit-media-controls-play-button]:bg-white/20 [&::-webkit-media-controls-play-button]:rounded-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                key={currentSong}
                style={{
                  filter: 'sepia(1) saturate(2) hue-rotate(200deg)'
                }}
              >
                <source src={currentSong} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-purple-500::-webkit-scrollbar-thumb {
          background: rgb(168 85 247);
          border-radius: 3px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default PlayMusic;