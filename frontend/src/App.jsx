import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./pages/Home.jsx";
import HomeLoggedIn from "./pages/HomeLoggedIn.jsx";
import Locations from "./pages/Locations.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homeloggedin" element={<HomeLoggedIn />} />
        <Route path="/locations" element={<Locations />} />
        <Route
          path="/locations/:identifier"
          element={
            <div className="min-h-screen flex items-center justify-center bg-bgC text-white">
              Loading location...
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
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
