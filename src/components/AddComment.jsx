// src/components/AddComment.jsx
import React, { useState } from "react";
import postService from "../services/post.service";

const AddComment = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postService.addComment(postId, content);
            console.log("Comment added:", response.data);
            setContent(""); // 清空输入框
            onCommentAdded(response.data); // 调用回调函数
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="form-group">
                <textarea
                    className="form-control"
                    placeholder="Add a comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-secondary">Add Comment</button>
        </form>
    );
};

export default AddComment;
