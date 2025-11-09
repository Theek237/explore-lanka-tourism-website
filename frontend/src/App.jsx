import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Route, Routes } from "react-router-dom";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import LocationDetail from "./pages/LocationDetail.jsx";
import Locations from "./pages/Locations.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);


export default function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Routes>
          {/* Public landing (auto-redirects if authenticated) */}
          <Route path="/" element={<Home />} />

          {/* Auth-only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/locations"
            element={
              <ProtectedRoute>
                <Locations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/locations/:identifier"
            element={
              <ProtectedRoute>
                <LocationDetail />
              </ProtectedRoute>
            }
          />

          {/* Auth flows */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* Admin routes */}
          <Route path="/explore-lanka-admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-white">
                404 Not Found
              </div>
            }
          />
        </Routes>
      </AdminAuthProvider>
    </AuthProvider>
  );
}
