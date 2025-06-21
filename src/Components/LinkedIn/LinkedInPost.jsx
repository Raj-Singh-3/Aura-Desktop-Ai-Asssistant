// // src/components/LinkedIn/LinkedInPost.jsx

// import React, { useState } from 'react';

// const LinkedInPost = ({ setBotStatus }) => {
//   const [content, setContent] = useState('');
//   const [media, setMedia] = useState(null);

//   const handleCreatePost = () => {
//     if (!content.trim()) {
//       alert('Please write something first.');
//       setBotStatus('Cannot post empty content.');
//       return;
//     }

//     alert(`✅ Post Created!\n\nContent: ${content}\nMedia: ${media?.name || 'None'}`);
//     setBotStatus('Post created successfully.');
//     clearForm();
//   };

//   const clearForm = () => {
//     setContent('');
//     setMedia(null);
//     setBotStatus('Post form cleared.');
//   };

//   return (
//     <div className="bg-white/5 border border-white/20 rounded-xl p-6 w-full max-w-3xl mx-auto shadow-md">
//       <h2 className="text-lg font-semibold text-[#667eea] mb-4 flex items-center gap-2">
//         📝 Create LinkedIn Post
//       </h2>

//       <div className="mb-4">
//         <label className="block text-[#a0a0ff] mb-2">Post Content</label>
//         <textarea
//           className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
//           rows={4}
//           placeholder="What's on your mind? Share your thoughts with your network..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-[#a0a0ff] mb-2">Add Image/Media (Optional)</label>
//         <input
//           type="file"
//           accept="image/*,video/*"
//           onChange={(e) => setMedia(e.target.files[0])}
//           className="w-full p-2 bg-white/10 text-white border border-white/30 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#667eea] file:text-white hover:file:bg-[#5a67d8]"
//         />
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={handleCreatePost}
//           className="bg-[#667eea] hover:bg-[#5a67d8] px-5 py-2 rounded-full text-white transition-all"
//         >
//           📤 Create Post
//         </button>
//         <button
//           onClick={clearForm}
//           className="bg-[#ff6b6b] hover:bg-[#ff4d4d] px-5 py-2 rounded-full text-white transition-all"
//         >
//           🗑️ Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LinkedInPost;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Send, Mic, Hash, AtSign, Image, Link2 } from 'lucide-react';

const LinkedInPost = ({ voiceCommand }) => {
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [mentions, setMentions] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [postHistory, setPostHistory] = useState([]);

  useEffect(() => {
    setCharCount(postContent.length);
  }, [postContent]);

  useEffect(() => {
    if (voiceCommand && voiceCommand.trim()) {
      // Process voice command for LinkedIn post
      const command = voiceCommand.toLowerCase();
      if (command.includes('create post') || command.includes('write post')) {
        const content = voiceCommand.replace(/create post|write post/gi, '').trim();
        if (content) {
          setPostContent(content);
        }
      } else if (command.includes('add hashtag')) {
        const hashtag = voiceCommand.replace(/add hashtag/gi, '').trim();
        if (hashtag) {
          setHashtags(prev => prev ? `${prev} #${hashtag}` : `#${hashtag}`);
        }
      }
    }
  }, [voiceCommand]);

  const handlePost = async () => {
    if (!postContent.trim()) return;

    setIsPosting(true);
    
    // Simulate posting delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPost = {
      id: Date.now(),
      content: postContent,
      hashtags: hashtags,
      mentions: mentions,
      timestamp: new Date(),
      likes: Math.floor(Math.random() * 50) + 1,
      comments: Math.floor(Math.random() * 10) + 1,
      shares: Math.floor(Math.random() * 5) + 1
    };

    setPostHistory(prev => [newPost, ...prev]);
    setPostContent('');
    setHashtags('');
    setMentions('');
    setIsPosting(false);
  };

  const suggestedHashtags = [
    '#AI', '#Technology', '#Innovation', '#Leadership', '#Career',
    '#Business', '#Startup', '#Productivity', '#Growth', '#Success'
  ];

  const addSuggestedHashtag = (tag) => {
    if (!hashtags.includes(tag)) {
      setHashtags(prev => prev ? `${prev} ${tag}` : tag);
    }
  };

  return (
    <div className="h-full space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Linkedin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create LinkedIn Post</h2>
            <p className="text-blue-300">Share your thoughts with your professional network</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Post Creation */}
        <div className="space-y-4">
          {/* Main Content */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Post Content</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className={`${charCount > 3000 ? 'text-red-400' : 'text-purple-300'}`}>
                  {charCount}/3000
                </span>
                <Mic className="w-4 h-4 text-purple-400" />
              </div>
            </div>

            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind? Share your professional insights..."
              className="w-full h-40 bg-black/30 border border-purple-500/30 rounded-xl p-4 text-white placeholder-purple-300 resize-none focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
              maxLength={3000}
            />

            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-2">
                <button className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors">
                  <Link2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Hashtags */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Hash className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Hashtags</h3>
            </div>

            <input
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#ai #technology #innovation"
              className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 mb-4"
            />

            <div className="flex flex-wrap gap-2">
              {suggestedHashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => addSuggestedHashtag(tag)}
                  className="px-3 py-1 bg-purple-800/30 hover:bg-purple-700/50 text-purple-300 hover:text-white rounded-full text-sm transition-colors border border-purple-600/30"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Mentions */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AtSign className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Mentions</h3>
            </div>

            <input
              value={mentions}
              onChange={(e) => setMentions(e.target.value)}
              placeholder="@john.doe @company.name"
              className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
            />
          </div>

          {/* Post Button */}
          <motion.button
            onClick={handlePost}
            disabled={!postContent.trim() || isPosting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isPosting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{isPosting ? 'Posting...' : 'Post to LinkedIn'}</span>
          </motion.button>
        </div>

        {/* Post History */}
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
          <h3 className="text-white font-semibold mb-4">Recent Posts</h3>
          
          {postHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-purple-300">No posts yet. Create your first post!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {postHistory.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4"
                >
                  <p className="text-white text-sm mb-2 line-clamp-3">{post.content}</p>
                  
                  {post.hashtags && (
                    <p className="text-blue-400 text-xs mb-2">{post.hashtags}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-purple-300">
                    <span>{post.timestamp.toLocaleDateString()}</span>
                    <div className="flex space-x-4">
                      <span>👍 {post.likes}</span>
                      <span>💬 {post.comments}</span>
                      <span>🔄 {post.shares}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedInPost;