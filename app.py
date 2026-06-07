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

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)

print("Tesseract Version:", pytesseract.get_tesseract_version())

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
# TEXT ANALYSIS
# -----------------------------------

@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():

    data = request.get_json()
    message = data.get("message", "")

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute(
        "SELECT free_trials FROM users WHERE username=?",
        (get_jwt_identity(),)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify({"message": "User not found"}), 404

    free_trials = user[0]

    if free_trials <= 0:
        return jsonify({"message": "Free trial finished. Upgrade required."}), 403

    message_lower = message.lower()

    keyword_detected = any(word in message_lower for word in scam_keywords)

    try:
        prediction = model.predict([message])[0]
    except:
        prediction = "unknown"

    if keyword_detected:
        prediction = "spam"

    cursor.execute(
        "UPDATE users SET free_trials = free_trials - 1 WHERE username=?",
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

    return jsonify({
        "text": extracted_text.strip()
    })

# -----------------------------------
# IMAGE ANALYSIS (MAIN FEATURE)
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

    keyword_detected = len(keyword_hits) > 0

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
        "keyword_detected": keyword_detected,
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

    connection = sqlite3.connect("users.db")
    cursor = connection.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE username=?",
        (username,)
    )

    if cursor.fetchone():
        return jsonify({"message": "User already exists"}), 400

    cursor.execute(
        "INSERT INTO users (username, password, free_trials) VALUES (?, ?, ?)",
        (username, password, 3)
    )

    connection.commit()
    connection.close()

    return jsonify({"message": "Signup successful"})

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
        "SELECT * FROM users WHERE username=? AND password=?",
        (username, password)
    )

    user = cursor.fetchone()
    connection.close()

    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=username)

    return jsonify({"token": token})

# -----------------------------------
# RUN SERVER
# -----------------------------------

if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )