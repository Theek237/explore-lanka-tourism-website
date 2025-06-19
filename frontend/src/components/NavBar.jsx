import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <img src="#" alt="logo" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Locations</li>
        <li>Travel Tips</li>
        <li>Travel Planner</li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
