from flask import Flask, request, jsonify
import requests
import json  # Añadir esta importación para manejar el parseo de JSON
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

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

        # Imprimir la respuesta completa de la API para debug
        print(f"Respuesta completa de la API: {data}")

        # Extraer y parsear el contenido de 'response' que viene como cadena
        raw_response = data.get('response', '')
        
        # Parsear la cadena de texto a un JSON si es necesario
        try:
            parsed_response = json.loads(raw_response)
        except json.JSONDecodeError:
            parsed_response = {"animation": "", "response": raw_response}

        # Imprimir los valores específicos para ver si son correctos
        print(f"Valor de animation: {parsed_response.get('animation', '')}")
        print(f"Valor de response: {parsed_response.get('response', '')}")

        return jsonify({
            "animation": parsed_response.get('animation', ''),
            "response": parsed_response.get('response', '')
        })
    except requests.exceptions.RequestException as e:
        print(f"Error de solicitud a la API: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0')
