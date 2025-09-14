import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
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
      <div className="min-h-screen bg-bgC flex flex-col items-center justify-center p-4">
        <div className="bg-bgC p-10 rounded-2xl w-full max-w-xl border border-gray-700 ">
          <h1 className="headtext">Log In to Your Account</h1>
          <p className="text-gray-400 text-center mt-2 mb-8">
            Your next adventure is just a password away.
          </p>

          {(error || submitError) && (
            <div className="text-red-400 text-center mb-4">
              {submitError || error}
            </div>
          )}

          <form
            className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 items-center"
            onSubmit={handleLoginFormSubmit}
          >
            {/* Email Row */}
            <label htmlFor="email" className="text-gray-300 justify-self-end">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Row */}
            <label
              htmlFor="password"
              className="text-gray-300 justify-self-end"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Forgot Password Link Row */}
            <div /> {/* Empty cell for alignment */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-sky-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Login Button Row */}
            <button
              className="col-span-2 bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition-colors duration-200 mt-4"
              type="submit"
              disabled={!ready}
            >
              {ready ? "Login" : "Checking Auth..."}
            </button>
          </form>
        </div>

        {/* Sign Up link below the form container */}
        <p className="text-center text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
