import axios from "axios";

const viteEnv =
  typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {};

const apiBase = viteEnv.VITE_API_URL || "";

const httpClient = axios.create({
  // If VITE_API_URL is "/api", use "/api" (proxy).
  // If VITE_API_URL is "http://localhost:3001", use that directly.
  // If VITE_API_URL is empty, default to "/api" (proxy).
  baseURL: apiBase || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

export function unwrapApiData(response) {
  const payload = response.data;
  return payload && typeof payload === "object" && "data" in payload
    ? payload.data
    : payload;
}

export default httpClient;