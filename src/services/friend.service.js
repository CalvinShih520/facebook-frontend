import api from "./api";

const getFriends = () => {
  return api.get("/friends");
};

const searchUsers = (query) => {
  return api.get(`/search/${query}`);
};

const sendFriendRequest = (friendId) => {
  return api.post("/friends/request", { friendId });
};

const respondToFriendRequest = (friendId, action) => {
  return api.post("/friends/respond", { friendId, action });
};

const friendService = {
  getFriends,
  searchUsers,
  sendFriendRequest,
  respondToFriendRequest,
};

export default friendService;
