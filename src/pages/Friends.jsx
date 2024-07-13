import React, { useState, useEffect } from "react";
import friendService from "../services/friend.service";
import './css/Friends.css'

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    friendService.getFriends().then(
      (response) => {
        console.log("Friends data:", response.data); // 调试信息
        setFriends(response.data);
      },
      (error) => {
        console.error("Error fetching friends:", error);
      }
    );
  }, []);

  return (
    <div className="friends-container mt-5">
      <h2>My Friends</h2>
      <ul className="list-group">
        {friends.map((friend) => (
          <li key={friend._id} className="list-group-item friend-item">
            <div>
              <strong>{friend.username}</strong> ({friend.email})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
