import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const axiosClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
  });

  const fetchMe = useCallback(async () => {
    console.log("[AuthContext] fetchMe() start. current user =", user);
    try {
      setError(null);
      console.log("[AuthContext] Attempt 1: GET /api/auth/me via cookie");
      const { data } = await axiosClient.get("/api/auth/me");
      console.log("[AuthContext] Cookie auth success. user =", data);
      setUser(data);
      return true;
    } catch (err1) {
      console.log(
        "[AuthContext] Cookie auth failed:",
        err1?.response?.data || err1.message
      );
      const stored = localStorage.getItem("token");
      if (!stored) {
        console.log("[AuthContext] No stored token. Setting user = null");
        setUser(null);
        return false;
      }
      try {
        console.log(
          "[AuthContext] Attempt 2: GET /api/auth/me with Bearer token"
        );
        const { data } = await axiosClient.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${stored}` },
        });
        console.log("[AuthContext] Token auth success. user =", data);
        setUser(data);
        return true;
      } catch (err2) {
        console.log(
          "[AuthContext] Token auth failed. Clearing stored token.",
          err2?.response?.data || err2.message
        );
        localStorage.removeItem("token");
        setUser(null);
        return false;
      }
    }
  }, [axiosClient, user]);

  useEffect(() => {
    (async () => {
      console.log("[AuthContext] Initial auth check starting...");
      await fetchMe();
      setReady(true);
      console.log("[AuthContext] Initial auth check complete. ready = true");
    })();
  }, [fetchMe]);

  const register = async (form) => {
    console.log("[AuthContext] register() start. form =", form);
    setError(null);
    try {
      const { data } = await axiosClient.post("/api/auth/register", form);
      console.log(
        "[AuthContext] register success. (Per requirements NOT logging user in). server response =",
        data
      );
      return { ok: true };
    } catch (e) {
      const message = e.response?.data?.message || "Registration failed";
      console.log("[AuthContext] register failed:", message);
      setError(message);
      return { ok: false, error: message };
    }
  };

  const login = async (credentials) => {
    console.log("[AuthContext] login() start. credentials =", credentials);
    setError(null);
    try {
      const { data } = await axiosClient.post("/api/auth/login", credentials);
      console.log("[AuthContext] login success. response =", data);
      if (data.token) {
        console.log("[AuthContext] Storing token in localStorage");
        localStorage.setItem("token", data.token);
      } else {
        console.log("[AuthContext] No token in response");
      }
      setUser(data.user);
      return { ok: true };
    } catch (e) {
      const message = e.response?.data?.message || "Login failed";
      console.log("[AuthContext] login failed:", message);
      setError(message);
      return { ok: false, error: message };
    }
  };

  const logout = async () => {
    console.log("[AuthContext] logout() start");
    try {
      await axiosClient.post("/api/auth/logout");
      console.log("[AuthContext] logout endpoint success");
    } catch (e) {
      console.log(
        "[AuthContext] logout endpoint failed (ignored):",
        e?.response?.data || e.message
      );
    }
    localStorage.removeItem("token");
    setUser(null);
    console.log("[AuthContext] user cleared, token removed");
  };

  const refreshUser = async () => {
    console.log("[AuthContext] refreshUser() invoked");
    return fetchMe();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        ready,
        error,
        login,
        register,
        logout,
        refreshUser,
        authenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
