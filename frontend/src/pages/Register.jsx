import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

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
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
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
      <div className="min-h-screen bg-bgC flex flex-col items-center justify-center p-4">
        <div className="bg-bgC p-10 rounded-2xl w-full max-w-xl border border-gray-700">
          <h1 className="headtext">Create Your Account</h1>
          <p className="text-gray-400 text-center mt-2 mb-8">
            It only takes a minute to unlock a world of travel planning tools.
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <form
            className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 items-center"
            onSubmit={handleRegisterFormSubmit}
          >
            <label
              htmlFor="firstName"
              className="text-gray-300 justify-self-end"
            >
              First Name:
            </label>
            <input
              type="text"
              value={firstName}
              id="firstName"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label
              htmlFor="lastName"
              className="text-gray-300 justify-self-end"
            >
              Last Name:
            </label>
            <input
              type="text"
              value={lastName}
              id="lastName"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="email" className="text-gray-300 justify-self-end">
              Email:
            </label>
            <input
              type="email"
              value={email}
              id="email"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              htmlFor="password"
              className="text-gray-300 justify-self-end"
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              id="password"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <label
              htmlFor="confirmPassword"
              className="text-gray-300 justify-self-end"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              id="confirmPassword"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="col-span-2 bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition-colors duration-200 mt-4"
            >
              Register
            </button>
          </form>
        </div>
        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
