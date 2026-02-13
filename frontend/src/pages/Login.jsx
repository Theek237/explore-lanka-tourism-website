import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const { login, authenticated, ready, error } = useAuth();

  useEffect(() => {
    if (ready && authenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authenticated, ready, error, navigate]);

  async function handleLoginFormSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    const result = await login({ email, password });
    if (result.ok) {
      navigate("/dashboard", { replace: true });
    } else {
      setSubmitError(result.error || "Login failed");
    }
  }

  return (
    <>
      <NavBar />
      <div className="auth-wrap">
        <div className="form-card animate-fade-up">
          <div className="form-header">
            <h1 className="heading-xl font-koulen mb-2 heading-gradient">Log In</h1>
            <p className="subtext text-white/70 max-w-md mx-auto">
              Your next adventure is just a one password away.
            </p>
          </div>
          {(error || submitError) && (
            <div className="alert-error text-sm mb-4 text-center">
              {submitError || error}
            </div>
          )}
          <form onSubmit={handleLoginFormSubmit} className="form-grid">
            <label htmlFor="email" className="label text-right sm:text-left">Email</label>
            <input
              type="email"
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <label htmlFor="password" className="label text-right sm:text-left">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <div className="hidden sm:block" />
            <div className="flex justify-end -mt-2">
              <Link to="/forgot-password" className="text-xs text-blueC hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="sm:col-span-2 mt-2">
              <button type="submit" disabled={!ready} className="btn-primary btn-block">
                {ready ? "Login" : "Checking Auth..."}
              </button>
            </div>
          </form>
          <p className="text-center text-white/60 text-sm mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-blueC hover:underline font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
