// src/components/CommentList.jsx
import React, { useState, useEffect } from 'react';
import postService from '../services/post.service';
import AddComment from './AddComment';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await postService.getComments(postId);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentAdded = (newComment) => {
        setComments([...comments, newComment]); // 添加新评论到评论列表
    };

    return (
        <div className="comment-list mt-3">
            {comments.map((comment) => (
                <div key={comment._id} className="comment mb-2 p-2 border rounded">
                    {comment.content}
                </div>
            ))}
            <AddComment postId={postId} onCommentAdded={handleCommentAdded} />
        </div>
    );
};

export default CommentList;
