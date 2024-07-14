// 不需要 import axios from 'axios';
import TokenService from "./token.service";

let isRefreshing = false;
let refreshSubscribers = [];

const onRrefreshed = (accessToken) => {
  refreshSubscribers.map((callback) => callback(accessToken));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    console.log("Request config:", config); // 打印请求配置
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response data:", response.data); // 打印响应数据
    return response;
  },
  async (error) => {
    const { response, config } = error;
    const originalRequest = config;

    if (response) {
      console.log("Error response status:", response.status); // 打印错误响应状态
      console.log("Error response data:", response.data); // 打印错误响应数据

      if (response.status === 403 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            addRefreshSubscriber((accessToken) => {
              originalRequest.headers["x-auth-token"] = accessToken;
              resolve(instance(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const rs = await instance.post("/auth/token", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateNewAccessToken(accessToken);

          isRefreshing = false;
          onRrefreshed(accessToken);
          refreshSubscribers = [];

          originalRequest.headers["x-auth-token"] = accessToken;
          return instance(originalRequest);
        } catch (_error) {
          console.error("Token refresh error:", _error);
          isRefreshing = false;
          refreshSubscribers = [];
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
