import React, { useState, useEffect } from 'react';
import PostService from '../services/post.service';
// import AuthService from '../services/auth.service';
// import { useNavigate } from 'react-router-dom';

const PostPrivate = () => {
  const [privatePosts, setPrivatePosts] = useState([]);

  // const navigate = useNavigate();

  useEffect(() => {
    PostService.getAllPrivatePosts().then(
      (response) => {
        setPrivatePosts(response.data);
      },
      (error) => {
        console.log('Private page', error.response);
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
        <h3>{privatePosts.map((post) => post.content)}</h3>
    </section>
</>
  );
};

export default PostPrivate;