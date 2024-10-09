
# 🦙 LLM Agent - Llama 3.2 

Este proyecto proporciona un backend centrado en un agente LLM basado en Llama, que es el núcleo de un portafolio personal interactivo. El objetivo principal es utilizar el agente LLM para responder preguntas técnicas y profesionales basadas en la experiencia y el currículum de Cristian Vega Sánchez. 

## 📋 Descripción

El LLM responde de manera automática a preguntas complejas relacionadas con la experiencia profesional de Cristian, analizando el contexto y adaptando las respuestas a un tono profesional y técnico. La integración del avatar 3D es una extensión de este backend, enfocada en replicar la voz y apariencia del autor. Así como tambien proporcionar amiaciones que se ejecutaran en su avatar 3D.

## 📂 Estructura del Proyecto

```
📦 Avatar 3D Interactive Backend
 ┣ 📜 app.py                   # Script principal para iniciar el backend
 ┣ 📜 Dockerfile               # Configuración para la creación de contenedores Docker
 ┣ 📜 requirements.txt         # Librerías y dependencias necesarias
 ┣ 📜 initial_prompt.txt       # Prompt inicial para personalizar respuestas del avatar
 ┗ 📜 README.md                # Archivo de documentación actual
```

## 🛠️ Setup e Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/budydeveloper/3d-avatar-ai-portfolio.git
   cd 3d-avatar-ai-portfolio/llm-llama3
   ```


2. Configuración del modelo Llama

[!IMPORTANT]  
Antes de ejecutar la aplicación, es necesario asegurarse de que el modelo Llama esté instalado y en funcionamiento en el puerto `11434` de tu máquina local.

1. **Descargar e instalar Ollama**:  
   Visita el siguiente enlace para descargar e instalar Ollama en tu sistema:  
   [Descargar Ollama](https://ollama.com/download)

2. **Ejecutar el modelo Llama**:  
   Inicia el modelo Llama con el siguiente comando desde la terminal:

   ```bash
   ollama run llama3.2
   ```

3. **Verificar la instalación**:  
   Puedes comprobar que Ollama se está ejecutando correctamente realizando una petición `curl` a `http://localhost:11434/`:

   ```bash
   curl http://localhost:11434/
   ```

   La respuesta esperada debe ser:

   ```json
   { "message": "Ollama is running" }
   ```



3. Usando Docker:

   ```bash
   docker build -t llm-agent-backend .
   docker run -p 5000:5000 llm-agent-backend
   ```

## 🔥 API Endpoints

### POST `/ask`

Este endpoint recibe preguntas y devuelve respuestas del avatar basadas en la información proporcionada.

- **Request**:
  
  ```json
  {
      "question": "What technologies did you use at Dow Jones?"
  }
  ```

- **Response**:

  ```json
  {
      "animation": "nod",
      "response": "At Dow Jones, I primarily worked with AWS cloud services, Java, and various microservices components, handling data processing and analytics tasks."
  }
  ```

### Testing la API con `curl` en Windows CMD

Puedes probar el endpoint utilizando el siguiente comando desde la terminal de Windows:

```cmd
curl -X POST http://localhost:5000/ask -H "Content-Type: application/json" -d "{\"question\": \"What technologies did you use at Dow Jones?\"}"
```

## ⚙️ Customización

El comportamiento y las respuestas del avatar se pueden personalizar modificando el archivo `initial_prompt.txt`. Este archivo establece el tono y los temas permitidos para las respuestas. Cambia este archivo según tus necesidades antes de ejecutar la aplicación.

### Ejemplo de configuración:

El archivo `initial_prompt.txt` define la estructura de las respuestas. Asegúrate de que refleje tus preferencias.

## 📜 Licencia

Este proyecto se distribuye bajo la licencia MIT. Para más detalles, consulta el archivo `LICENSE` en el repositorio.

## 📧 Contacto

Si tienes alguna pregunta, duda o sugerencia, no dudes en contactar a **Cristian Vega Sánchez** a través de [LinkedIn](https://www.linkedin.com/in/cristianve/) o enviar un correo a **budy.dev.tech@gmail.com**.
