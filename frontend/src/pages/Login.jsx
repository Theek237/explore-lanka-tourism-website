import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginFormSubmit(e) {
    e.preventDefault();
    console.log("Login Data Submitted");
    console.log("email: ", email);
    console.log("password: ", password);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have account yet?
          <Link to="/register">
            <span> Register.</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
