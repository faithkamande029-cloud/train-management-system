// src/services/httpClient.js
import axios from "axios";

const viteEnv =
  typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {};
const apiBase = viteEnv.VITE_API_URL || "http://127.0.0.1:5000";

const httpClient = axios.create({
  baseURL: `${apiBase}/api`,
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
