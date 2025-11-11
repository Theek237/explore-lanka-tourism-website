import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);
import { API_BASE } from "../utils/apiBase";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const axiosClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
  });

  const fetchMe = useCallback(async () => {
    try {
      setError(null);
      const { data } = await axiosClient.get("/api/auth/me");
      setUser(data);
      return true;
    } catch (err1) {
      const stored = localStorage.getItem("token");
      if (!stored) {
        setUser(null);
        return false;
      }
      try {
        const { data } = await axiosClient.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${stored}` },
        });
        setUser(data);
        return true;
      } catch (err2) {
        localStorage.removeItem("token");
        setUser(null);
        return false;
      }
    }
  }, [axiosClient, user]);

  useEffect(() => {
    (async () => {
      await fetchMe();
      setReady(true);
    })();
  }, [fetchMe]);

  const register = async (form) => {
    setError(null);
    try {
      const { data } = await axiosClient.post("/api/auth/register", form);
      return { ok: true };
    } catch (e) {
      const message = e.response?.data?.message || "Registration failed";
      setError(message);
      return { ok: false, error: message };
    }
  };

  const login = async (credentials) => {
    setError(null);
    try {
      const { data } = await axiosClient.post("/api/auth/login", credentials);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      setUser(data.user);
      return { ok: true };
    } catch (e) {
      const message = e.response?.data?.message || "Login failed";
      setError(message);
      return { ok: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post("/api/auth/logout");
    } catch (e) {}
    localStorage.removeItem("token");
    setUser(null);
  };

  const refreshUser = async () => {
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
