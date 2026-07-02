import { useState } from "react";
import logo from "../assets/trustscan.png";
import {
  LogIn,
  LayoutDashboard,
  Menu,
  X
} from "lucide-react";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <nav className="navbar">

      <div className="logo">
        <img
          src={logo}
          alt="TrustScan Logo"
          className="logo-img"
        />
        TrustScan
      </div>

      {/* Desktop Navigation */}
      <div className="nav-links">

        <a href="/">Home</a>
        <a href="#resources">Resources</a>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>

        {isLoggedIn ? (
          <button
            className="nav-btn"
            onClick={() => window.location.href = "/dashboard"}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
        ) : (
          <button
            className="nav-btn"
            onClick={() => window.location.href = "/login"}
          >
            <LogIn size={18} />
            Login
          </button>
        )}

      </div>

      {/* Mobile Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

        <a href="/" onClick={() => setMenuOpen(false)}>
          Home
        </a>

        <a href="#resources" onClick={() => setMenuOpen(false)}>
          Resources
        </a>

        <a href="#features" onClick={() => setMenuOpen(false)}>
          Features
        </a>

        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>

        <a href="#contact" onClick={() => setMenuOpen(false)}>
          Contact
        </a>

        {isLoggedIn ? (
          <button
            className="mobile-login-btn"
            onClick={() => window.location.href = "/dashboard"}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
        ) : (
          <button
            className="mobile-login-btn"
            onClick={() => window.location.href = "/login"}
          >
            <LogIn size={18} />
            Login
          </button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;