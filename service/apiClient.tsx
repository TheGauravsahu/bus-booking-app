import axios from "axios";
import { BASE_URL } from "./config";
import { storage } from "./storage";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// req interceptors
apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// resinterceptors
apiClient.interceptors.response.use(
  async (config) => {
    const token = await storage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    if (error.response?.status === 403) {
      const refreshToken = await storage.getRefreshToken();
      if (!refreshToken) return Promise.reject(error);
      try {
        const { data } = await apiClient.post("/users/refresh", {
          refreshToken,
        });
        await storage.setAccessToken(data);
        error.config.headers.Authorization = `Bearer ${data}`;
        return axios(error.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
