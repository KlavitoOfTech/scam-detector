import { useState } from "react";
import "../styles/checkUrl.css";

function CheckUrl() {

  const API = process.env.REACT_APP_API_URL;

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkUrl = async () => {

    if (!url) {
      alert("Enter a URL");
      return;
    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `${API}/analyze-url`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              url
            })
          }
        );

      const data =
        await response.json();

      setResult(data);

    } catch (error) {

      console.error(error);

      alert("URL analysis failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="url-page">

      <div className="url-card">

        <h1>Check URL</h1>

        <p>
          Analyze suspicious links,
          phishing websites and scam URLs.
        </p>

        <input
          type="text"
          placeholder="Paste URL..."
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
        />

        <button
          onClick={checkUrl}
          disabled={loading}
        >
          {
            loading
              ? "Analyzing..."
              : "Analyze URL"
          }
        </button>

        <p className="disclaimer-text">
          By submitting data above, you are agreeing to our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service and Privacy Notice</a>,
          and to the sharing of your Sample submission with the security community. Please do not submit
          any personal information; we are not responsible for the contents of your submission.
          <a href="/disclaimer" target="_blank" rel="noopener noreferrer">Learn more.</a>
        </p>

        {result && (

          <div className="scan-result">

            <h3>
              Scan Result
            </h3>

            <p>
              <strong>Status:</strong>{" "}
              {result.result}
            </p>

            <p>
              <strong>Risk Score:</strong>{" "}
              {result.risk_score}/100
            </p>

            <p>
              <strong>Reason:</strong>{" "}
              {result.reason}
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default CheckUrl;