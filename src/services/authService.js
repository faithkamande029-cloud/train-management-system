import httpClient from "./httpClient";

export const login = (data) => {
  return httpClient.post("/login", data);
};

export const logout = () => {
  return httpClient.delete("/logout");
};

export const getCurrentUser = () => {
  return httpClient.get("/check-session");
};

export const register = (data) => {
  return httpClient.post("/register", data);
};
