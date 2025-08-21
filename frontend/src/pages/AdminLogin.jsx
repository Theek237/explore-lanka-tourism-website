import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const { adminLogin, isAdminAuthenticated, ready, error } = useAdminAuth();

  useEffect(() => {
    if (ready && isAdminAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAdminAuthenticated, ready, error, navigate]);

  async function handleAdminLoginFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    const result = await adminLogin({ email, password });
    if (result.ok) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setSubmitError(result.error || "Admin login failed");
    }
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-bgC flex flex-col items-center justify-center p-4">
        <div className="bg-bgC p-10 rounded-2xl w-full max-w-xl border border-gray-700">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="headtext">Admin Access</h1>
            <p className="subtext">
              Enter your administrator credentials to continue
            </p>
          </div>

          {/* Combined context error + submit error */}
          {(error || submitError) && (
            <div className="text-red-400 text-center mb-4">
              {submitError || error}
            </div>
          )}

          <form
            className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 items-center"
            onSubmit={handleAdminLoginFormSubmit}
          >
            {/* Email Row */}
            <label
              htmlFor="admin-email"
              className="text-gray-300 justify-self-end"
            >
              Admin Email:
            </label>
            <input
              type="email"
              id="admin-email"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />

            {/* Password Row */}
            <label
              htmlFor="admin-password"
              className="text-gray-300 justify-self-end"
            >
              Admin Password:
            </label>
            <input
              type="password"
              id="admin-password"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />

            {/* Login Button Row */}
            <button
              className="col-span-2 bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition-colors duration-200 mt-4"
              type="submit"
              disabled={!ready}
            >
              {ready ? "Access Admin Panel" : "Checking Authentication..."}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Only authorized administrators can access this area
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
