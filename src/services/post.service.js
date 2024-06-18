import api from "./api";

const getAllPublicPosts = () => {
  return api.get("/posts/public");
};

const getAllPrivatePosts = () => {
  return api.get("/posts/private");
};

const createPost = (userId, content, isPrivate) => {
  return api.post(`/posts/${userId}`, {
    content,
    isPrivate
  });
};

const addComment = (postId, content) => {
  return api.post(`/posts/${postId}/comments`, {
    content
  });
};

const getComments = (postId) => {
  return api.get(`/posts/${postId}/comments`);
};

const getPostById = (postId) => {
  return api.get(`/posts/${postId}`);
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
  createPost,
  addComment,
  getComments,
  getPostById,
};

export default postService;
