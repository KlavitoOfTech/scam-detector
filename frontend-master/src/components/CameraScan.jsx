import { useRef, useState } from "react";
import Webcam from "react-webcam";

import "../styles/cameraScan.css";

function CameraScan() {

  const webcamRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const dataURLtoFile = (dataurl, filename) => {

    const arr = dataurl.split(",");

    const mime =
      arr[0].match(/:(.*?);/)[1];

    const bstr =
      atob(arr[1]);

    let n = bstr.length;

    const u8arr =
      new Uint8Array(n);

    while (n--) {

      u8arr[n] =
        bstr.charCodeAt(n);

    }

    return new File(
      [u8arr],
      filename,
      { type: mime }
    );

  };

  const capture = () => {

    const screenshot =
      webcamRef.current.getScreenshot();

    setImage(screenshot);

    // Clear previous result
    setResult(null);

  };

  const analyzeImage = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const imageFile =
        dataURLtoFile(
          image,
          "scan.jpg"
        );

      const formData =
        new FormData();

      formData.append(
        "image",
        imageFile
      );

      const response =
        await fetch(
          "http://127.0.0.1:5000/analyze-image",
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`
            },

            body: formData
          }
        );

      const data = await response.json();

      if (data.msg === "Token has expired") {

        alert(
          "Session expired. Please login again."
        );

        localStorage.removeItem("token");

        window.location.href = "/login";

        return;
      }

      console.log("API Response:", data);

      setResult(data);

    }

    catch (error) {

      console.error(error);

      alert(
        "Image analysis failed"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="camera-page">

      <div className="camera-card">

        <h1>Camera Scan</h1>

        <p>
          Scan QR codes, URLs, messages,
          receipts, and suspicious content.
        </p>

        {!image ? (

          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="camera-preview"
            />

            <button
              className="capture-btn"
              onClick={capture}
            >
              Capture
            </button>
          </>

        ) : (

          <>
            <img
              src={image}
              alt="Captured"
              className="captured-image"
            />

            <div className="button-row">

              <button
                onClick={() => {
                  setImage(null);
                  setResult(null);
                }}
              >
                Retake
              </button>

              <button
                onClick={analyzeImage}
                disabled={loading}
              >
                {
                  loading
                    ? "Analyzing..."
                    : "Analyze"
                }
              </button>

            </div>

            {result && (

              <div className="scan-result">

                <h3>
                  Scan Result
                </h3>

                <p>
                  <strong>Status:</strong>
                  {" "}
                  {result.result}
                </p>

                <p>
                  <strong>Risk Score:</strong>
                  {" "}
                  {result.risk_score}/100
                </p>

                <p>
                  <strong>Scam Keywords:</strong>
                  {" "}
                  {
                    result.keyword_detected
                      ? "Detected"
                      : "Not Detected"
                  }
                </p>

                <h4>
                  Extracted Text
                </h4>

                <pre>
                  {result.text}
                </pre>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
}

export default CameraScan;