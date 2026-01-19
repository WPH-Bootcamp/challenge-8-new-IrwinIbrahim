import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_READ_ACCESS_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
  }

  return config;
});

export const BACKDROP = "https://image.tmdb.org/t/p/original";
export const imageUrl = "https://image.tmdb.org/t/p/w500";
