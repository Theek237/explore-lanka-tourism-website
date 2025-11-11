import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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
      <div className="auth-wrap">
        <div className="form-card animate-fade-up">
          <div className="form-header">
            <h1 className="heading-xl font-koulen mb-2 heading-gradient">Admin Access</h1>
            <p className="subtext text-white/70 max-w-md mx-auto">Enter your administrator credentials to continue</p>
          </div>
          {(error || submitError) && (
            <div className="alert-error text-sm mb-4 text-center">
              {submitError || error}
            </div>
          )}
          <form onSubmit={handleAdminLoginFormSubmit} className="form-grid">
            <label htmlFor="admin-email" className="label text-right sm:text-left">Admin Email</label>
            <input
              type="email"
              id="admin-email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
            />
            <label htmlFor="admin-password" className="label text-right sm:text-left">Admin Password</label>
            <input
              type="password"
              id="admin-password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <div className="sm:col-span-2 mt-2">
              <button type="submit" disabled={!ready} className="btn-primary btn-block">
                {ready ? "Access Admin Panel" : "Checking Authentication..."}
              </button>
            </div>
          </form>
          <p className="text-center text-white/50 text-xs mt-8 tracking-wide">Only authorized administrators can access this area</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminLogin;
