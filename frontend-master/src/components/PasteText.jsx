import { useState } from "react";


import "../styles/pasteText.css";

function PasteText() {

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
        "http://127.0.0.1:5000/predict",
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

    <div className="container">

      <div className="card">

        <h1>🛡 TrustScan</h1>

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

      </div>

    </div>

  );

}

export default PasteText;