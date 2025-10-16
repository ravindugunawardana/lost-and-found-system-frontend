import axios from "axios";
import { getToken, clearToken } from "../auth/tokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5173/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(err);
  }
);

export default api;
