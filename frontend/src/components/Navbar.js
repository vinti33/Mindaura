import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Import the separate CSS

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Mind Aura</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
