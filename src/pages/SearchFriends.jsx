import React, { useState } from "react";
import friendService from "../services/friend.service";
import './css/SearchFriends.css'; // 引入CSS文件

const SearchFriends = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    friendService.searchUsers(query).then(
      (response) => {
        setResults(response.data);
      },
      (error) => {
        console.error("Error searching friends:", error);
      }
    );
  };

  const handleSendRequest = (friendId) => {
    friendService.sendFriendRequest(friendId).then(
      (response) => {
        alert("Friend request sent!");
      },
      (error) => {
        console.error("Error sending friend request:", error);
      }
    );
  };

  return (
    <div className="search-friends-container mt-5">
      <h2>Search Friends</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by username"
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">Search</button>
      </form>
      <ul className="list-group mt-4">
        {results.map((user) => (
          <li key={user._id} className="list-group-item">
            <div className="">
              <span>{user.username} ({user.email})</span>
              <button className="btn btn-success" onClick={() => handleSendRequest(user._id)}>Add Friend</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFriends;
