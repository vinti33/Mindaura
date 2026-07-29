import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css"; // Import the separate CSS

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Mind Aura
      </h2>
      <div className="nav-links">
        {location.pathname !== "/" && (
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "transparent",
              border: "none",
              color: "#4a148c",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "inherit",
            }}
          >
            ← Back
          </button>
        )}
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
