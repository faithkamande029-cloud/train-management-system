// src/services/httpClient.js
import axios from "axios";

const httpClient = axios.create({
  // In development, Vite proxies this path to Flask on port 5000. This avoids
  // a browser cross-origin request while preserving VITE_API_URL for deployment.
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  // The deployed backend authenticates with a session cookie.
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
