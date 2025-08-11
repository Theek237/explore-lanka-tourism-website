import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, redirectTo = "/login" }) {
  const { authenticated, ready } = useAuth();
  console.log(
    "[ProtectedRoute] render. ready=",
    ready,
    " authenticated=",
    authenticated,
    " redirectTo=",
    redirectTo
  );

  if (!ready)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading (auth check)...
      </div>
    );

  if (!authenticated) {
    console.log(
      "[ProtectedRoute] Not authenticated. Redirecting to",
      redirectTo
    );
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
