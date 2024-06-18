import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AddComment from "../components/AddComment";

const PostPrivate = () => {
  const [privatePosts, setPrivatePosts] = useState([]);

  useEffect(() => {
    PostService.getAllPrivatePosts().then(
      (response) => {
        setPrivatePosts(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        // if (error.response && error.response.status === 403) {
        //   AuthService.logout();
        //   navigate('/login');
        //   window.location.reload();
        // }
      }
    );
  }, []);

  return (
    <>
      <section className="section">
        {privatePosts.map((post) => (
          <div key={post._id}>
            <h3>{post.content}</h3>
            <AddComment postId={post._id} /> {/* 傳遞 postId 給 AddComment 組件 */}
          </div>
        ))}
      </section>
    </>
  );
};

export default PostPrivate;
