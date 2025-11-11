// Normalized API base URL for both dev and production
// - In dev, set VITE_API_URL to full origin like "http://localhost:5000"
// - In prod behind nginx, set it to empty or omit entirely and we will use relative URLs

export const API_BASE = (() => {
  let base = import.meta?.env?.VITE_API_URL ?? "";
  if (!base) return ""; // use relative
  // Treat a single slash as relative base
  if (base === "/") return "";
  // Remove any trailing slashes to avoid protocol-relative URLs (e.g., //api/...)
  return String(base).replace(/\/+$/, "");
})();
