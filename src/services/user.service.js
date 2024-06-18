import api from "./api";

const getUserProfile = (id) => {
  return api.get(`/users/${id}`);
};

const updateUserProfile = (id, data) => {
  return api.patch(`/users/${id}`, data);
};

const userService = {
  getUserProfile,
  updateUserProfile,
};

export default userService;
