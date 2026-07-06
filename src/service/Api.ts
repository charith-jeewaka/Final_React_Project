// src/service/Api.ts

import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { logout, refreshTokenCall } from "./Auth";
import {getAccessToken,getRefreshToken,setAccessToken,} from "./TokenService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/refresh"];

// Extend Axios request config to support retry flag
interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Request Interceptor
// Automatically attach JWT

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
    config.url?.includes(endpoint),
  );

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
// Refresh expired access token automatically

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
      originalRequest.url?.includes(endpoint),
    );

    if (
      !isPublic &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token found.");
        }

        const response = await refreshTokenCall(refreshToken);

        const newAccessToken = response.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);

        logout();

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
