import { useState } from "react";

import "../styles/pasteText.css";

function PasteText() {
    const API = process.env.REACT_APP_API_URL;

  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const token =
    localStorage.getItem("token");

  const analyzeMessage = async () => {

    if (!message) {

      alert("Enter a message");

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
          `${API}/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 403) {

        alert(data.message);

        return;

      }

      setResult(data.result);

    } catch (error) {

      console.error(error);

      alert("Prediction failed");

    } finally {

      setLoading(false);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  return (

    <div className="paste-container">

      <div className="paste-card">

        <h1>Paste Text</h1>

        <textarea
          placeholder="Paste suspicious message..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button
          className="paste-btn"
          onClick={analyzeMessage}
          disabled={loading}
        >
          {loading
            ? "Scanning..."
            : "Analyze"}
        </button>

        {result && (

          <div className="result">

            {result === "spam" ? (

              <h2 className="spam">
                🚨 Spam Detected
              </h2>

            ) : (

              <h2 className="safe">
                ✅ Safe Message
              </h2>

            )}

          </div>

        )}

        <button
          className="paste-btn logout"
          onClick={logout}
        >
          Logout
        </button>

        <p className="disclaimer-text">
          By submitting data above, you are agreeing to our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service and Privacy Notice</a>,
          and to the sharing of your Sample submission with the security community. Please do not submit
          any personal information; we are not responsible for the contents of your submission.
          <a href="/disclaimer" target="_blank" rel="noopener noreferrer">Learn more.</a>
        </p>

      </div>

    </div>

  );

}

export default PasteText;