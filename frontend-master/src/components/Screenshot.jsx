import { useState } from "react";
import "../styles/screenshotScan.css";
import imageCompression from "browser-image-compression";

function Screenshot() {

  const API = process.env.REACT_APP_API_URL;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeScreenshot = async () => {
    if (!file) {
      alert("Please upload a screenshot first");
      return;
    }

    try {
      setLoading(true);

      // Compress the image before uploading
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("image", compressedFile);

      const response = await fetch(
        `${API}/analyze-image`,
        {
          method: "POST",
          body: formData
        }
      );

      // IMPORTANT: handle backend errors properly
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Backend error:", data);
        alert(data?.message || "Screenshot analysis failed");
        return;
      }

      console.log("SUCCESS:", data);
      setResult(data);
    } catch (error) {
      console.error("Network error:", error);
      alert("Screenshot analysis failed (network error)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screenshot-page">
      <div className="screenshot-card">
        <h1>Screenshot Scan</h1>

        <p className="screenshot-subtitle">
          Upload screenshots of suspicious messages, emails, websites, crypto scams, or fake giveaways.
        </p>

        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files[0];
              if (!selected) return;

              setFile(selected);
              setPreview(URL.createObjectURL(selected));
              setResult(null);
            }}
          />

          <div>
            <h3>Upload Screenshot</h3>
            <p>Click here to choose an image</p>
            <p className="disclaimer-text">
              By submitting data above, you are agreeing to our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service and Privacy Notice</a>,
              and to the sharing of your Sample submission with the security community. Please do not submit
              any personal information; we are not responsible for the contents of your submission.
              <a href="/disclaimer" target="_blank" rel="noopener noreferrer">Learn more.</a>
            </p>            
          </div>
        </label>

        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}

        {file && (
          <button
            className="analyze-btn"
            onClick={analyzeScreenshot}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Screenshot"}
          </button>
        )}

        {result && (
          <div className="scan-result">
            <h3>Scan Result</h3>

            <div className="result-row">
              <span>Status</span>
              <strong className={result.result === "spam" ? "spam" : "safe"}>
                {result.result}
              </strong>
            </div>

            <div className="result-row">
              <span>Risk Score</span>
              <strong>{result.risk_score}/100</strong>
            </div>

            <div className="result-row">
              <span>Scam Keywords</span>
              <strong>
                {result.keyword_detected ? "Detected" : "Not Detected"}
              </strong>
            </div>

            <h4>Extracted Text</h4>
            <pre>{result.text || "No text detected"}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Screenshot;