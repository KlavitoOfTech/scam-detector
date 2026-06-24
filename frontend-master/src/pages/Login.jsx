import { useState } from "react";
import {
  Eye,
  EyeOff
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/trustscan.png";

import "../styles/auth.css";

function Login() {

  const API = process.env.REACT_APP_API_URL;
  console.log("API URL:", process.env.REACT_APP_API_URL);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (loading) return;

    setLoading(true);

    try {

      const response = await fetch(
        `${API}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        );

        window.location.href =
          "/dashboard";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Login failed");

    } finally {

      setLoading(false);

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

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to continue protecting yourself with TrustScan.
        </p>

        <div className="form-group">

          <label>Email</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>Password</label>

          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {
                showPassword
                  ? <EyeOff size={18}/>
                  : <Eye size={18}/>
              }
            </button>

          </div>

        </div>

        <div className="forgot-row">

          <span
            className="forgot-link"
          >
            Forgot Password?
          </span>

        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="divider">
          OR 
        </div>

        <button className="google-btn">
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="signup-text">

          Don't have an account?

          <span
            className="toggle"
            onClick={() =>
              window.location.href =
              "/signup"
            }
          >
            Sign up
          </span>

        </p>

      </div>

    </div>

  );
}

export default Login;