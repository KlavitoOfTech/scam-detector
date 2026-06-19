from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import joblib
import os
import requests
import cv2
import numpy as np
from PIL import Image

from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required
)

# -----------------------------------
# APP SETUP
# -----------------------------------

app = Flask(__name__)

CORS(app, resources={
    r"/*": {"origins": "*"}
})

app.config["JWT_SECRET_KEY"] = "supersecretkey_123456789_secure"

jwt = JWTManager(app)

# -----------------------------------
# OCR API
# -----------------------------------

OCR_API_KEY = os.getenv("OCR_API_KEY")

def extract_text_from_image(image_file):

    response = requests.post(
        "https://api.ocr.space/parse/image",
        files={
            "file": (
                image_file.filename,
                image_file.stream,
                image_file.content_type
            )
        },
        data={
            "apikey": OCR_API_KEY,
            "language": "eng",
            "isOverlayRequired": False
        }
    )

    result = response.json()

    print("OCR RESPONSE:", result)

    if result.get("ParsedResults"):
        return result["ParsedResults"][0].get(
            "ParsedText",
            ""
        )

    return ""

# -----------------------------------
# LOAD ML MODEL
# -----------------------------------

model = joblib.load("spam_model.pkl")

# -----------------------------------
# SCAM KEYWORDS
# -----------------------------------

scam_keywords = [
    "free", "crypto", "airdrop", "claim", "winner",
    "gift", "wallet", "urgent", "bonus", "login",
    "password", "verify", "account", "bank",
    "security", "click", "limited", "offer",
    "congratulations", "prize", "reward",
    "https", "bitcoin", "ethereum"
]

# -----------------------------------
# HOME
# -----------------------------------

@app.route("/")
def home():
    return "TrustScan API Running"

# -----------------------------------
# DB HELPER
# -----------------------------------

def get_db_connection():

    conn = sqlite3.connect("users.db")

    conn.row_factory = sqlite3.Row

    return conn

# -----------------------------------
# TEXT PREDICTION
# -----------------------------------

@app.route("/predict", methods=["POST"])
#@jwt_required()
def predict():

    data = request.get_json()

    message = data.get(
        "message",
        ""
    )

    message_lower = message.lower()

    keyword_detected = any(
        word in message_lower
        for word in scam_keywords
    )

    try:

        prediction = model.predict(
            [message]
        )[0]

    except Exception as e:

        print(
            "MODEL ERROR:",
            str(e)
        )

        prediction = "unknown"

    if keyword_detected:
        prediction = "spam"

    return jsonify({
        "result": prediction
    })

# -----------------------------------
# OCR ONLY
# -----------------------------------

@app.route("/ocr", methods=["POST"])
@jwt_required()
def ocr():

    if "image" not in request.files:

        return jsonify({
            "message": "No image uploaded"
        }), 400

    image_file = request.files["image"]

    text = extract_text_from_image(
        image_file
    )

    return jsonify({
        "text": text.strip()
    })

# -----------------------------------
# IMAGE ANALYSIS
# -----------------------------------

@app.route("/analyze-image", methods=["POST"])
#@jwt_required()
def analyze_image():

    try:

        if "image" not in request.files:

            return jsonify({
                "message": "No image uploaded"
            }), 400

        image_file = request.files["image"]

        extracted_text = extract_text_from_image(
            image_file
        )

        print(
            "TEXT:",
            extracted_text
        )

        text_lower = extracted_text.lower()

        keyword_hits = [
            word
            for word in scam_keywords
            if word in text_lower
        ]

        try:

            prediction = model.predict(
                [extracted_text]
            )[0]

        except Exception as e:

            print(
                "MODEL ERROR:",
                str(e)
            )

            prediction = "unknown"

        risk_score = 20

        if prediction == "spam":
            risk_score += 50

        risk_score += min(
            len(keyword_hits) * 5,
            30
        )

        risk_score = min(
            risk_score,
            100
        )

        return jsonify({
            "text": extracted_text.strip(),
            "result": prediction,
            "risk_score": risk_score,
            "keywords_found": keyword_hits
        })

    except Exception as e:

        print(
            "ANALYZE ERROR:",
            str(e)
        )

        return jsonify({
            "error": str(e)
        }), 500

# -----------------------------------
# URL ANALYSIS
# -----------------------------------

@app.route("/analyze-url", methods=["POST"])
#@jwt_required()
def analyze_url():

    data = request.get_json()

    url = data.get("url", "").lower()

    suspicious_keywords = [
        "login",
        "verify",
        "free",
        "claim",
        "gift",
        "airdrop",
        "crypto",
        "wallet",
        "bonus",
        "reward",
        "bank"
    ]

    hits = [
        word
        for word in suspicious_keywords
        if word in url
    ]

    risk_score = len(hits) * 15

    # extra checks
    if "http://" in url:
        risk_score += 20

    if "@" in url:
        risk_score += 20

    if len(url.split(".")) > 3:
        risk_score += 15

    risk_score = min(risk_score, 100)

    result = (
        "spam"
        if risk_score >= 40
        else "safe"
    )

    return jsonify({
        "url": url,
        "result": result,
        "risk_score": risk_score,
        "keywords_found": hits,
        "reason":
            "Potential phishing indicators detected"
            if result == "spam"
            else "No major phishing indicators detected"
    })

# -----------------------------------
# QR ANALYSIS
# -----------------------------------

@app.route("/analyze-qr", methods=["POST"])
def analyze_qr():

    try:

        if "image" not in request.files:

            return jsonify({
                "message": "No QR image uploaded"
            }), 400

        image_file = request.files["image"]

        image = Image.open(image_file)

        image_np = np.array(image)

        detector = cv2.QRCodeDetector()

        qr_text, points, _ = detector.detectAndDecode(
            image_np
        )

        if not qr_text:

            return jsonify({
                "result": "safe",
                "risk_score": 0,
                "reason": "No QR code detected"
            })

        suspicious_keywords = [
            "login",
            "verify",
            "free",
            "claim",
            "gift",
            "airdrop",
            "crypto",
            "wallet",
            "bonus",
            "reward",
            "bank"
        ]

        hits = [

            word

            for word in suspicious_keywords

            if word in qr_text.lower()

        ]

        risk_score = len(hits) * 15

        if "http://" in qr_text:
            risk_score += 20

        if "@" in qr_text:
            risk_score += 20

        if len(qr_text.split(".")) > 3:
            risk_score += 15

        risk_score = min(
            risk_score,
            100
        )

        result = (
            "spam"
            if risk_score >= 40
            else "safe"
        )

        return jsonify({

            "url": qr_text,

            "result": result,

            "risk_score": risk_score,

            "keywords_found": hits,

            "reason":
                "Potential phishing QR detected"
                if result == "spam"
                else "No major threats detected"

        })

    except Exception as e:

        print("QR ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500
        
# -----------------------------------
# SIGNUP
# -----------------------------------

@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username=?",
        (username,)
    )

    if cursor.fetchone():

        conn.close()

        return jsonify({
            "message": "User already exists"
        }), 400

    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (username, password)
    )

    conn.commit()

    conn.close()

    return jsonify({
        "message": "Signup successful"
    })

# -----------------------------------
# LOGIN
# -----------------------------------

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username=? AND password=?",
        (username, password)
    )

    user = cursor.fetchone()

    conn.close()

    if not user:

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    token = create_access_token(
        identity=username
    )

    return jsonify({
        "token": token
    })

# -----------------------------------
# RUN APP
# -----------------------------------

if __name__ == "__main__":

    from database import init_db

    init_db()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )