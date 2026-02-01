from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Mock Data
routes = [
    {"id": 1, "from": "New York", "to": "Boston", "price": 40, "duration": "4h"},
    {"id": 2, "from": "London", "to": "Paris", "price": 60, "duration": "5h30m"},
    {"id": 3, "from": "Berlin", "to": "Munich", "price": 30, "duration": "6h"}
]

@app.route("/bus")
def bus():
    return jsonify(service="Bus Agency", status="Available", routes_count=len(routes))

@app.route("/schedule", methods=["GET"])
def get_schedule():
    return jsonify(routes)

@app.route("/book", methods=["POST"])
def book_ticket():
    data = request.json
    route_id = data.get("route_id")
    # Simple Mock Logic
    if any(r['id'] == route_id for r in routes):
        return jsonify({"status": "confirmed", "ticket_id": f"BUS-{random.randint(1000,9999)}"}), 201
    return jsonify({"error": "Route not found"}), 404

@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
