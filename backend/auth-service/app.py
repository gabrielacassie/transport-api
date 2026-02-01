from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret-key"  # Change this!
jwt = JWTManager(app)

# Mock User Database
users = {
    "admin": "password123",
    "user": "userpass"
}

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username not in users or users[username] != password:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(hours=1))
    return jsonify(access_token=access_token)

@app.route("/verify", methods=["GET"])
@jwt_required()
def verify():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
