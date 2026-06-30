import { useState } from "react";
import logo from "../assets/trustscan.png";
import "../styles/auth.css";

function Signup() {
  const API = process.env.REACT_APP_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Signup failed");
      }

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        <div className="auth-logo">
          <img
            src={logo}
            alt="TrustScan Logo"
            className="auth-logo-img"
          />
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join TrustScan and stay protected from scams,
          phishing links, fake websites, and malicious QR codes.
        </p>

        <div className="form-group">
          <label>Email</label>

          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <button
          className="login-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>

        <p className="signup-text">
          Already have an account?

          <span
            className="toggle"
            onClick={() =>
              (window.location.href = "/login")
            }
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;