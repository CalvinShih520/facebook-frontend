import api from "./api";

const getAllUser = () => {
  return api.get(`/users`);
};

const getUserProfile = (id) => {
  return api.get(`/users/${id}`);
};

const updateUserProfile = (id, data) => {
  return api.patch(`/users/${id}`, data);
};

const userService = {
  getUserProfile,
  updateUserProfile,
  getAllUser
};

export default userService;
