// src/components/PostForm.jsx
import React, { useState } from 'react';
import PostService from '../services/post.service';
import TokenService from '../services/token.service';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const currentUser = TokenService.getUser();
  const userId = currentUser.user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await PostService.createPost(userId,content, false);
      onPostCreated(newPost.data); // 通知父组件新帖子的创建
      setContent(''); // 清空输入框
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  );
};

export default PostForm;
