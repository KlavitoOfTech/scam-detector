import { useState } from "react";
import "../styles/auth.css";

function Signup() {

  const API = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const response = await fetch(
        `${API}/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      alert(data.message);

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      alert("Signup failed");

    }

  };

  return (

    <div className="container">

      <div className="card">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleSignup}>
          Signup
        </button>

        <p>
          Already have an account?{" "}

          <span
            className="toggle"
            onClick={() =>
              window.location.href = "/"
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