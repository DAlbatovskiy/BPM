from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

DATA_FILE = 'data.json'

@app.route("/")
def index():
    return "Привет от backend!"

@app.route("/save-json", methods=["POST"])
def save_json():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    data = request.get_json()
    # Читаем старые данные
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            all_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        all_data = []
    # Добавляем новые
    all_data.append(data)
    # Сохраняем обратно
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    return jsonify({"message": "JSON saved", "count": len(all_data)}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
