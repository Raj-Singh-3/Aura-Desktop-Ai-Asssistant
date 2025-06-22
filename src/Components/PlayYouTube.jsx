import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Search } from 'lucide-react';

const PlayYouTube = ({ voiceCommand }) => {
  const [videoId, setVideoId] = useState(null); // No default video initially
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories for the homepage
  const categories = [
    'All', 'Music', 'Gaming', 'News', 'Cooking', 
    'Live', 'Recently uploaded', 'Watched'
  ];

  // Fetch popular videos for homepage
  useEffect(() => {
    const fetchPopularVideos = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual YouTube Data API key
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=24&regionCode=US&key=${apiKey}`
        );
        
        if (!response.ok) throw new Error('YouTube API request failed');
        
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to load videos. Check console for details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularVideos();
  }, []);

  // Handle voice commands
  useEffect(() => {
    if (voiceCommand) {
      const command = voiceCommand.toLowerCase();
      if (command.includes('play') && command.includes('video')) {
        const query = command.replace(/play|video/gi, '').trim();
        setSearchQuery(query);
        handleSearch(query);
      }
    }
  }, [voiceCommand]);

  // Search function
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`
      );
      
      if (!response.ok) throw new Error('YouTube API request failed');
      
      const data = await response.json();
      setVideos(data.items);
      setSelectedCategory('Search Results');
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search YouTube. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Player options
  const opts = {
    height: '360',
    width: '100%',
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 1
    },
  };

  return (
    <div className="youtube-container p-4 bg-white/10 rounded-xl backdrop-blur-sm max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center mb-4 gap-2 sticky top-0 z-10 bg-slate-900/80 p-2 rounded-lg">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            placeholder="Search YouTube..."
            className="w-full p-2 pl-10 rounded-lg bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-2.5 text-white/50" size={18} />
        </div>
        <button
          onClick={() => handleSearch(searchQuery)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          disabled={isLoading}
        >
          Search
        </button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Player (only shown when a video is selected) */}
      {videoId && (
        <div className="video-player-container mb-6 rounded-xl overflow-hidden shadow-lg bg-black">
          <YouTube videoId={videoId} opts={opts} />
        </div>
      )}

      {/* Videos Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-xl h-64 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div
              key={video.id.videoId || video.id}
              onClick={() => setVideoId(video.id.videoId || video.id)}
              className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition cursor-pointer group"
            >
              <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
                  {video.snippet.liveBroadcastContent === 'live' ? 'LIVE' : 'VIDEO'}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-white font-medium line-clamp-2">
                  {video.snippet.title}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {video.snippet.channelTitle}
                </p>
                {video.statistics && (
                  <p className="text-white/50 text-xs mt-1">
                    {parseInt(video.statistics.viewCount).toLocaleString()} views
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Voice Command Hints */}
      <div className="voice-hints mt-6 text-sm text-white/60">
        <p>Try these voice commands:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>"Search for cat videos"</li>
          <li>"Play [video title]"</li>
          <li>"Show me [category] videos"</li>
        </ul>
      </div>
    </div>
  );
};

export default PlayYouTube;