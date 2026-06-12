from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import joblib
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)

# -----------------------------------
# APP SETUP
# -----------------------------------

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config["JWT_SECRET_KEY"] = "supersecretkey_123456789_secure"
jwt = JWTManager(app)

# -----------------------------------
# TESSERACT CONFIG
# -----------------------------------

import shutil

tesseract_path = shutil.which("tesseract")

if tesseract_path:
    pytesseract.pytesseract.tesseract_cmd = tesseract_path
else:
    print("⚠️ Tesseract not found")

# -----------------------------------
# LOAD ML MODEL
# -----------------------------------

model = joblib.load("spam_model.pkl")

# -----------------------------------
# SCAM KEYWORDS
# -----------------------------------

scam_keywords = [
    "free", "crypto", "airdrop", "claim", "winner", "gift",
    "wallet", "urgent", "bonus", "login", "password",
    "verify", "account", "bank", "security", "click",
    "limited", "offer", "congratulations", "prize",
    "reward", "https", "bitcoin", "ethereum"
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
@jwt_required()
def predict():

    data = request.get_json()
    message = data.get("message", "")

    message_lower = message.lower()

    keyword_detected = any(
        word in message_lower for word in scam_keywords
    )

    try:
        prediction = model.predict([message])[0]
    except:
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
        return jsonify({"message": "No image uploaded"}), 400

    image_file = request.files["image"]

    image = Image.open(image_file.stream).convert("RGB")

    width, height = image.size
    image = image.resize((width * 2, height * 2))

    image = image.convert("L")

    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.8)

    image = image.filter(ImageFilter.SHARPEN)

    text = pytesseract.image_to_string(image, config="--oem 3 --psm 6")

    return jsonify({
        "text": text.strip()
    })

# -----------------------------------
# IMAGE ANALYSIS
# -----------------------------------

@app.route("/analyze-image", methods=["POST"])
@jwt_required()
def analyze_image():

    if "image" not in request.files:
        return jsonify({"message": "No image uploaded"}), 400

    image_file = request.files["image"]

    image = Image.open(image_file.stream).convert("RGB")

    width, height = image.size
    image = image.resize((width * 2, height * 2))

    image = image.convert("L")

    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.8)

    image = image.filter(ImageFilter.SHARPEN)

    extracted_text = pytesseract.image_to_string(
        image,
        config="--oem 3 --psm 6"
    )

    text_lower = extracted_text.lower()

    keyword_hits = [
        word for word in scam_keywords
        if word in text_lower
    ]

    try:
        prediction = model.predict([extracted_text])[0]
    except:
        prediction = "unknown"

    risk_score = 20

    if prediction == "spam":
        risk_score += 50

    risk_score += min(len(keyword_hits) * 5, 30)
    risk_score = min(risk_score, 100)

    return jsonify({
        "text": extracted_text.strip(),
        "result": prediction,
        "risk_score": risk_score,
        "keywords_found": keyword_hits
    })

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
        return jsonify({"message": "User already exists"}), 400

    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (username, password)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Signup successful"})

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
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=username)

    return jsonify({"token": token})

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