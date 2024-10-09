# Utiliza una imagen oficial de Python como imagen base
FROM python:3.10-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo de requisitos
COPY requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de la aplicación en el contenedor
COPY . .

# Asegúrate de copiar el archivo 'initial_prompt.txt'
COPY initial_prompt.txt ./initial_prompt.txt

# Expone el puerto en el que la aplicación correrá
EXPOSE 5000

# Ejecuta la aplicación
CMD ["python", "app.py"]
