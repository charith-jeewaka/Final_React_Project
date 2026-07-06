// src/service/TokenService.ts

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export const getAccessToken = () => localStorage.getItem("accessToken");

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);

export const setRefreshToken = (token: string) =>
  localStorage.setItem("refreshToken", token);

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const setUser = (user: AuthUser) =>
  localStorage.setItem("user", JSON.stringify(user));

export const getUser = (): AuthUser | null => {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as AuthUser) : null;
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const clearSession = () => {
  clearTokens();
  clearUser();
};

export const isLoggedIn = () => !!getAccessToken();
