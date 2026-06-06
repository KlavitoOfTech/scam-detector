import logo from "../assets/trustscan.png";
import { LogIn } from "lucide-react";

function Navbar() {
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

      <div className="nav-links">

        <a href="/">Home</a>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>

        <button
          className="nav-btn"
          onClick={() => window.location.href="/login"}
        >
          <LogIn size={18} />
          Login
        </button>

      </div>

    </nav>
  );
}

export default Navbar;