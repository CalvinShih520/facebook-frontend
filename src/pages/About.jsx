import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/token.service";
import "./About.css"; // 引入CSS文件

const About = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = TokenService.getUser();
    console.log("Current user:", currentUser); // 调试信息

    if (currentUser && currentUser.user) {
      setUser(currentUser.user);
    } else {
      console.error("No user data found in local storage");
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container mt-5">
      <h2>Profile Information</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Birthdate:</strong> {new Date(user.birthdate).toLocaleDateString()}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
      <button onClick={() => navigate('/update-about')}>Update Profile</button>
    </div>
  );
};

export default About;
