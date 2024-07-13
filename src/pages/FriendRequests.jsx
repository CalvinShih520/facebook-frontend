import React, { useState, useEffect } from "react";
import friendService from "../services/friend.service";
import userService from "../services/user.service";
import TokenService from "../services/token.service";
import './css/FriendRequests.css'; // 引入CSS文件

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const currentUser = TokenService.getUser();
    setRequests(currentUser.user.receivedRequests || []);
    
    // 获取所有用户的信息
    const fetchAllUsers = async () => {
      try {
        const response = await userService.getAllUser();
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    // 筛选收到请求的用户详细信息
    const users = {};
    requests.forEach(req => {
      const user = allUsers.find(u => u._id === req);
      if (user) {
        users[req] = user;
      }
    });
    setUserDetails(users);
  }, [allUsers, requests]);

  const handleResponse = (friendId, action) => {
    friendService.respondToFriendRequest(friendId, action).then(
      (response) => {
        alert(`Friend request ${action}ed!`);
        setRequests(requests.filter((req) => req !== friendId));
      },
      (error) => {
        console.error(`Error ${action}ing friend request:`, error);
      }
    );
  };

  return (
    <div className="friend-requests-container container mt-5">
      <h2>Friend Requests</h2>
      <ul className="list-group">
        {requests.map((requestId) => {
          const request = userDetails[requestId];
          if (!request) return null; // 如果找不到用户，返回null

          return (
            <li key={requestId} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{request.username}</strong> ({request.email})
              </div>
              <div>
                <button className="btn btn-success me-2" onClick={() => handleResponse(requestId, "accept")}>Accept</button>
                <button className="btn btn-danger" onClick={() => handleResponse(requestId, "reject")}>Reject</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FriendRequests;
