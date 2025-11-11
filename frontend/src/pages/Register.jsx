import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { API_BASE } from "../utils/apiBase";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegisterFormSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email format");
      return;
    }
    try {
      await axios.post(
        `${API_BASE}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      setSuccess("Registration successful!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <>
      <NavBar />
      <div className="auth-wrap">
        <div className="form-card animate-fade-up">
          <div className="form-header">
            <h1 className="heading-xl font-koulen mb-2 heading-gradient">Create Your Account</h1>
            <p className="subtext text-white/70 max-w-md mx-auto">
              It only takes a minute to unlock a world of travel planning tools.
            </p>
          </div>

          {error && <p className="alert-error text-sm text-center mb-4">{error}</p>}
          {success && <p className="alert-success text-sm text-center mb-4">{success}</p>}

          <form className="form-grid" onSubmit={handleRegisterFormSubmit}>
            <label htmlFor="firstName" className="label text-right sm:text-left">First Name</label>
            <input
              type="text"
              value={firstName}
              id="firstName"
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="given-name"
            />

            <label htmlFor="lastName" className="label text-right sm:text-left">Last Name</label>
            <input
              type="text"
              value={lastName}
              id="lastName"
              className="input"
              onChange={(e) => setLastName(e.target.value)}
              required
              autoComplete="family-name"
            />

            <label htmlFor="email" className="label text-right sm:text-left">Email</label>
            <input
              type="email"
              value={email}
              id="email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <label htmlFor="password" className="label text-right sm:text-left">Password</label>
            <input
              type="password"
              value={password}
              id="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={6}
            />

            <label htmlFor="confirmPassword" className="label text-right sm:text-left">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              id="confirmPassword"
              className="input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              minLength={6}
            />
            <div className="sm:col-span-2 mt-2">
              <button type="submit" className="btn-primary btn-block">Register</button>
            </div>
          </form>
          <p className="text-center text-white/60 text-sm mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-blueC hover:underline font-medium">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
