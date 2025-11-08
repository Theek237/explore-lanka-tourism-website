import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminProtectedRoute({ children }) {
  const { isAdminAuthenticated, ready } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !isAdminAuthenticated) {
      navigate("/explore-lanka-admin", { replace: true });
    }
  }, [isAdminAuthenticated, ready, navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Checking admin authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return null; // Will redirect
  }

  return children;
}

export default AdminProtectedRoute;
