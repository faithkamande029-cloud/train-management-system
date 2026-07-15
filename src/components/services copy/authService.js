import httpClient from "./httpClient";

export const login = (data) => {
  return httpClient.post("/login", data);
};

export const logout = () => {
  return httpClient.post("/logout");
};

export const getCurrentUser = () => {
  return httpClient.get("/me");
};

export const refreshToken = (refreshToken) => {
  return httpClient.post("/refresh", { refreshToken });
};

export const register = (data) => {
  return httpClient.post("/register", data);
};