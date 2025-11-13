// Normalized API base URL for both dev and production
// - In dev, set VITE_API_URL to full origin like "http://localhost:5000"
// - In prod behind nginx, set it to empty or omit entirely and we will use relative URLs

export const API_BASE = (() => {
  const envBase = import.meta?.env?.VITE_API_URL;

  // If explicitly configured, normalize it
  if (envBase !== undefined && envBase !== null && envBase !== "") {
    if (envBase === "/") return ""; // treat single slash as relative base
    return String(envBase).replace(/\/+$/, ""); // trim trailing slashes
  }

  // Fallback for local development: if app runs on localhost, default backend port 5000
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:5000";
    }
  }

  // Default to relative (works in production behind reverse proxy)
  return "";
})();
