import axios from "axios";

// Read the environment variable (set in .env.development or .env)
const viteEnv = import.meta.env || {};
const apiBase = viteEnv.VITE_API_URL || "";

// If VITE_API_URL is set (e.g. http://127.0.0.1:5000), use it directly.
// If it's empty, fall back to "/api" (so Vite's proxy handles it).
const baseURL = apiBase || "/api";

// Create the HTTP client
const httpClient = axios.create({
  baseURL,                    // e.g. "http://127.0.0.1:5000" or "/api"
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,      // For cookies/sessions
  timeout: 30000,             // Wait up to 30 seconds
});

// Helper to extract data from API responses
export function unwrapApiData(response) {
  const payload = response.data;
  return payload && typeof payload === "object" && "data" in payload
    ? payload.data
    : payload;
}

export default httpClient;