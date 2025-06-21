// src/components/LinkedIn/LinkedInPost.jsx
import React, { useState } from 'react';

const LinkedInPost = ({ setBotStatus }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);

  const handleCreatePost = () => {
    if (content.trim() === '') {
      setBotStatus('Please enter content before posting.');
      alert('Your post is empty!');
      return;
    }

    // Simulate API call
    setBotStatus('Your LinkedIn post has been created.');
    alert(`✅ Post Created!\n\nContent: ${content}\nMedia: ${media?.name || 'None'}`);
    clearForm();
  };

  const clearForm = () => {
    setContent('');
    setMedia(null);
    setBotStatus('Post form cleared.');
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#667eea] mb-4">📝 Create LinkedIn Post</h2>

      <div className="mb-4">
        <label className="block text-[#a0a0ff] mb-2">Post Content</label>
        <textarea
          className="w-full p-3 bg-white/10 text-white border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#667eea]"
          placeholder="What's on your mind? Share your thoughts with your network..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#a0a0ff] mb-2">Add Image/Media (Optional)</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setMedia(e.target.files[0])}
          className="w-full p-2 bg-white/10 text-white border border-white/30 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#667eea] file:text-white hover:file:bg-[#5a67d8]"
        />
      </div>

      <div className="flex gap-4">
        <button
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-xl transition-all"
          onClick={handleCreatePost}
        >
          📤 Create Post
        </button>
        <button
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white hover:shadow-xl transition-all"
          onClick={clearForm}
        >
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default LinkedInPost;
