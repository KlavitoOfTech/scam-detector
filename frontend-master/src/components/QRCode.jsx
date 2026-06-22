import { useState } from "react";
import "../styles/qrCode.css";

function QrCode() {

  const API = process.env.REACT_APP_API_URL;

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeQr = async () => {

    if (!file) {
      alert("Upload a QR code image");
      return;
    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      const response =
        await fetch(
          `${API}/analyze-qr`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`
            },

            body: formData
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        alert(
          data.message ||
          "QR analysis failed"
        );

        return;
      }

      setResult(data);

    } catch (error) {

      console.error(error);

      alert(
        "QR analysis failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="qr-page">

      <div className="qr-card">

        <h1>
          QR Code Scan
        </h1>

        <p>
          Upload a QR code and
          verify where it leads
          before opening it.
        </p>

        <label className="upload-box">

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {

              const selected =
                e.target.files[0];

              if (!selected) return;

              setFile(selected);

              setPreview(
                URL.createObjectURL(
                  selected
                )
              );

              setResult(null);

            }}
          />

          <div>

            <h3>
              Upload QR Code
            </h3>

            <p>
              Click to select image
            </p>

            <p className="disclaimer-text">
              By submitting data above, you are agreeing to our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service and Privacy Notice</a>,
              and to the sharing of your Sample submission with the security community. Please do not submit
              any personal information; we are not responsible for the contents of your submission.
              <a href="/disclaimer" target="_blank" rel="noopener noreferrer">Learn more.</a>
            </p>

          </div>

        </label>

        {preview && (

          <img
            src={preview}
            alt="QR Preview"
            className="preview-image"
          />

        )}

        {file && (

          <button
            className="analyze-btn"
            onClick={analyzeQr}
            disabled={loading}
          >
            {
              loading
                ? "Analyzing..."
                : "Analyze QR Code"
            }
          </button>

        )}

        {result && (

          <div className="scan-result">

            <h3>
              Scan Result
            </h3>

            <p>
              <strong>
                Decoded URL:
              </strong>{" "}
              {result.url}
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              {result.result}
            </p>

            <p>
              <strong>
                Risk Score:
              </strong>{" "}
              {result.risk_score}/100
            </p>

            <p>
              <strong>
                Reason:
              </strong>{" "}
              {result.reason}
            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default QrCode;