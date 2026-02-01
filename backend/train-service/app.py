from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

timetable = [
    {"train_no": "T100", "route": "Central St -> North Station", "departure": "08:00 AM", "status": "On Time"},
    {"train_no": "T101", "route": "Central St -> South Station", "departure": "08:15 AM", "status": "Delayed"},
    {"train_no": "T102", "route": "West End -> East Side", "departure": "08:30 AM", "status": "On Time"}
]

@app.route("/train")
def train():
    return jsonify(service="Train Agency", status="Running")

@app.route("/timetable", methods=["GET"])
def get_timetable():
    return jsonify(timetable)

@app.route("/health")
def health():
    return "OK", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
