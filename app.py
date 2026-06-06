from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import joblib
import pytesseract

from PIL import Image

from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)

# -----------------------------------
# TESSERACT CONFIG
# -----------------------------------

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

print(
    "Tesseract Version:",
    pytesseract.get_tesseract_version()
)

# -----------------------------------
# LOAD MODEL
# -----------------------------------

model = joblib.load("spam_model.pkl")

# -----------------------------------
# SCAM KEYWORDS
# -----------------------------------

scam_keywords = [
    "free",
    "crypto",
    "airdrop",
    "claim",
    "winner",
    "gift",
    "wallet",
    "urgent",
    "bonus",
    "google"
]

# -----------------------------------
# APP CONFIG
# -----------------------------------

app = Flask(__name__)

CORS(app)

app.config["JWT_SECRET_KEY"] = "supersecretkey"

jwt = JWTManager(app)

# -----------------------------------
# HOME
# -----------------------------------

@app.route("/")
def home():

    return "TrustScan API Running"

# -----------------------------------
# TEXT ANALYSIS
# -----------------------------------

@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():

    data = request.get_json()

    message = data["message"]

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT free_trials
        FROM users
        WHERE username=?
        """,
        (get_jwt_identity(),)
    )

    user = cursor.fetchone()

    free_trials = user[0]

    if free_trials <= 0:

        connection.close()

        return jsonify({
            "message": "Free trial finished. Upgrade required."
        }), 403

    message_lower = message.lower()

    keyword_detected = any(
        word in message_lower
        for word in scam_keywords
    )

    prediction = model.predict([message])[0]

    if keyword_detected:
        prediction = "spam"

    cursor.execute(
        """
        UPDATE users
        SET free_trials = free_trials - 1
        WHERE username=?
        """,
        (get_jwt_identity(),)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "result": prediction,
        "remaining_trials": free_trials - 1
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

    image = Image.open(image_file)

    extracted_text = pytesseract.image_to_string(image)

    return jsonify({
        "text": extracted_text
    })

# -----------------------------------
# IMAGE ANALYSIS
# -----------------------------------

@app.route("/analyze-image", methods=["POST"])
@jwt_required()
def analyze_image():

    if "image" not in request.files:

        return jsonify({
            "message": "No image uploaded"
        }), 400

    image_file = request.files["image"]

    image = Image.open(image_file)

    extracted_text = pytesseract.image_to_string(image,
    config="--psm 6")

    print("OCR TEXT:")
    print(extracted_text)
    print("----------------")

    text_lower = extracted_text.lower()

    keyword_detected = any(
        word in text_lower
        for word in scam_keywords
    )

    prediction = model.predict(
        [extracted_text]
    )[0]

    if keyword_detected:
        prediction = "spam"

    risk_score = 25

    if prediction == "spam":
        risk_score = 90

    return jsonify({

        "text": extracted_text,

        "result": prediction,

        "risk_score": risk_score,

        "keyword_detected": keyword_detected

    })

# -----------------------------------
# SIGNUP
# -----------------------------------

@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    username = data["username"]
    password = data["password"]

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE username=?
        """,
        (username,)
    )

    existing_user = cursor.fetchone()

    if existing_user:

        connection.close()

        return jsonify({
            "message": "User already exists"
        }), 400

    cursor.execute(
        """
        INSERT INTO users
        (
            username,
            password,
            free_trials
        )
        VALUES (?, ?, ?)
        """,
        (
            username,
            password,
            3
        )
    )

    connection.commit()
    connection.close()

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

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE username=?
        AND password=?
        """,
        (
            username,
            password
        )
    )

    user = cursor.fetchone()

    connection.close()

    if not user:

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    access_token = create_access_token(
        identity=username
    )

    return jsonify({
        "token": access_token
    })

# -----------------------------------
# START SERVER
# -----------------------------------

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )