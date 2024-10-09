from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Si estás usando CORS, asegúrate de importar esto

app = Flask(__name__)
CORS(app)  # Si estás usando CORS, habilítalo aquí

# Configuraciones
OLLAMA_API_URL = "http://host.docker.internal:11434/api/generate"
MODEL_NAME = "llama3.2"

# Cargar el prompt inicial desde el archivo 'initial_prompt.txt'
with open('initial_prompt.txt', 'r', encoding='utf-8') as file:
    INITIAL_PROMPT = file.read()

@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.json.get('question', '')
    prompt = f"{INITIAL_PROMPT}\nUser: {user_input}\n"

    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_API_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        model_response = data.get('response', '')
        return jsonify({"response": model_response})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0')
