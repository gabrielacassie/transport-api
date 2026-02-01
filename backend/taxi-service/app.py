from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import uuid

app = Flask(__name__)
CORS(app)

drivers = [
    {"id": "d1", "name": "John Doe", "rating": 4.8, "car": "Toyota Prius"},
    {"id": "d2", "name": "Jane Smith", "rating": 4.9, "car": "Tesla Model 3"},
    {"id": "d3", "name": "Bob Brown", "rating": 4.5, "car": "Ford Focus"}
]

@app.route("/taxi")
def taxi():
    return jsonify(service="Taxi Agency", status="Online", available_drivers=len(drivers))

@app.route("/drivers", methods=["GET"])
def get_drivers():
    return jsonify(drivers)

@app.route("/request-ride", methods=["POST"])
def request_ride():
    # Mock ride request
    data = request.json
    pickup = data.get("pickup")
    dropoff = data.get("dropoff")
    
    assigned_driver = random.choice(drivers)
    
    return jsonify({
        "status": "arriving", 
        "ride_id": str(uuid.uuid4()),
        "driver": assigned_driver,
        "eta": f"{random.randint(2, 15)} mins"
    }), 201

@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
