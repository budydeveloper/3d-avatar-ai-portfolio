from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

OLLAMA_URL = 'http://ollama:11434/api/generate'  # Asegúrate de que este sea correcto

@app.route('/ask', methods=['POST'])
def ask_agent():
    user_input = request.json.get('question', '')
    if not user_input:
        return jsonify({'error': 'No question provided'}), 400

    # Realiza la llamada a Ollama directamente
    try:
        response = requests.post(OLLAMA_URL, json={'model': 'llama3.2', 'prompt': user_input, 'stream': False})

        # Mostrar el estado de la respuesta
        print(f"Response status code: {response.status_code}")

        # Comprobar si la respuesta fue exitosa
        if response.status_code != 200:
            return jsonify({'error': 'Error calling Ollama service', 'status_code': response.status_code}), response.status_code
        
        # Intentar decodificar la respuesta JSON
        data = response.text
        
        # Intenta cargar la respuesta como JSON
        try:
            json_data = json.loads(data)
        except json.JSONDecodeError:
            return jsonify({'error': 'Invalid JSON response from Ollama', 'response': data}), 500

    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Request to Ollama failed', 'message': str(e)}), 500

    # Obtener solo el atributo 'response'
    complete_response = json_data.get('response', '')

    # Retornar solo el atributo 'response'
    return jsonify({'response': complete_response.strip()})

if __name__ == '__main__':
    app.run(debug=True)
