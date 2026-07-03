import { useRef, useState } from "react";
import Webcam from "react-webcam";

import "../styles/cameraScan.css";

function CameraScan() {

  const API = process.env.REACT_APP_API_URL;
  console.log("API URL:", API);

  const webcamRef = useRef(null);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Back camera by default
  const [facingMode, setFacingMode] =
    useState("environment");

  const dataURLtoFile = (
    dataurl,
    filename
  ) => {

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
    setResult(null);

  };

  const analyzeImage = async () => {

    try {

      setLoading(true);

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
          `${API}/analyze-image`,
          {
            method: "POST",

            body: formData
          }
        );

      const text = await response.text();

      console.log("Response Status:", response.status);
      console.log("Response Body:", text);
      
      const data = JSON.parse(text);
      
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

        <h1>
          Camera Scan
        </h1>

        <p>
          Scan QR codes, URLs,
          messages, receipts and
          suspicious content.
        </p>

        <p className="disclaimer-text">
          By submitting data above, you are agreeing to our <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service and Privacy Notice</a>,
          and to the sharing of your Sample submission with the security community. Please do not submit
          any personal information; we are not responsible for the contents of your submission.
          <a href="/disclaimer" target="_blank" rel="noopener noreferrer">Learn more.</a>
        </p>

        {!image ? (

          <>

            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="camera-preview"
              videoConstraints={{
                facingMode
              }}
            />

            <div className="button-row">

              <button
                className="switch-camera-btn"
                type="button"
                onClick={() =>
                  setFacingMode(
                    facingMode ===
                    "environment"
                      ? "user"
                      : "environment"
                  )
                }
              >
                {
                  facingMode ===
                  "environment"
                    ? "Front Camera"
                    : "Back Camera"
                }
              </button>

              <button
                className="capture-btn"
                onClick={capture}
              >
                Capture
              </button>

            </div>

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
                className="retake-btn"
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
                  <strong>Scam Keywords:</strong>{" "}
                  {result.keywords_found &&
                  result.keywords_found.length > 0
                    ? "Detected"
                    : "Not Detected"}
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