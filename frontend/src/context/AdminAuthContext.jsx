import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AdminAuthContext = createContext(null);
import { API_BASE } from "../utils/apiBase";

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  const axiosClient = useMemo(() => {
    return axios.create({
      baseURL: API_BASE,
      withCredentials: true,
    });
  }, [API_BASE]);

  const fetchAdminMe = useCallback(async () => {
    try {
      setError(null);
      const { data } = await axiosClient.get("/api/auth/me");

      if (data.role !== "admin") {
        setAdminUser(null);
        return false;
      }

      setAdminUser(data);
      return true;
    } catch (err1) {
      const stored = localStorage.getItem("adminToken");
      if (!stored) {
        setAdminUser(null);
        return false;
      }
      try {
        const { data } = await axiosClient.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${stored}` },
        });

        // Check if user is admin
        if (data.role !== "admin") {
          localStorage.removeItem("adminToken");
          setAdminUser(null);
          return false;
        }

        setAdminUser(data);
        return true;
      } catch (err2) {
        localStorage.removeItem("adminToken");
        setAdminUser(null);
        return false;
      }
    }
  }, [axiosClient]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const didFetch = await fetchAdminMe();
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchAdminMe]);

  const adminLogin = async (credentials) => {
    setError(null);
    try {
      const { data } = await axiosClient.post(
        "/api/auth/admin/login",
        credentials
      );
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }
      setAdminUser(data.user);
      return { ok: true };
    } catch (e) {
      const message = e.response?.data?.message || "Admin login failed";
      setError(message);
      return { ok: false, error: message };
    }
  };

  const adminLogout = async () => {
    try {
      await axiosClient.post("/api/auth/logout");
    } catch (e) {}
    localStorage.removeItem("adminToken");
    setAdminUser(null);
  };

  const refreshAdminUser = async () => {
    return fetchAdminMe();
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        ready,
        error,
        adminLogin,
        adminLogout,
        refreshAdminUser,
        isAdminAuthenticated: !!adminUser,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
