import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import CommentList from "../components/CommentList";
import PostForm from "../components/PostForm";
import "./Home.css"; // 引入CSS文件

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await PostService.getAllPublicPosts();
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]); // 将新帖子添加到帖子列表的开头
    };

    return (
        <div className="container mt-5">
            <div className="post-form-container mb-4">
                <PostForm onPostCreated={handlePostCreated}  />
            </div>
            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post._id} className="post mb-4 p-3 border rounded">
                        <div className="post-content mb-3">{post.content}</div>
                        <CommentList postId={post._id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
