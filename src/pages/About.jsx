import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenService from "../services/token.service";
import './css/About.css';
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
      <div className="profile-header">
        <h2>Profile Information</h2>
        
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <p><strong>Username:</strong> {user.username}</p>
        </div>
        <div className="profile-info-item">
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="profile-info-item">
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
        <div className="profile-info-item">
          <p><strong>Birthdate:</strong> {new Date(user.birthdate).toLocaleDateString()}</p>
        </div>
        <div className="profile-info-item">
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/update-about')}>Update Profile</button>
    </div>
  );
};

export default About;
