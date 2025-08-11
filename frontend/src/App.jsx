import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Locations from "./pages/Locations.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <AuthProvider>
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
              <div className="min-h-screen flex items-center justify-center bg-bgC text-white">
                Loading location...
              </div>
            </ProtectedRoute>
          }
        />
        {/* Auth flows */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
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
    </AuthProvider>
  );
}
