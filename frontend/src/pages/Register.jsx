import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegisterFormSubmit(e) {
    e.preventDefault();
    console.log("Registration Data Submitted");
    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Confirm Password: ", confirmPassword);
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegisterFormSubmit}>
        <div>
          <input
            type="text"
            value={firstName}
            placeholder="First Name: "
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={lastName}
            placeholder="Last Name: "
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            placeholder="Email: "
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            id="password"
            placeholder="Password: "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            value={confirmPassword}
            id="confirmPassword"
            placeholder="Confirm Password:"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span>Login.</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
