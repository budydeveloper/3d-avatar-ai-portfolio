import torch
from TTS.api import TTS

print("Starting TTS script...")
# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# List available 🐸TTS models
print(TTS().list_models())

# Init TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
# 1,87 GB model

# Run TTS
# ❗ Since this model is multi-lingual voice cloning model, we must set the target speaker_wav and language
# Text to speech list of amplitude values as output
wav = tts.tts(text="Hola, Soy Cristian Vega y esto es un audio para poder clonar mi voz y añadirsela a un avatar.", speaker_wav="input.wav", language="es")
# Text to speech to a file
tts.tts_to_file(text="Hola mundo soy Cristian Vega! Ingenierio de software especializado en Java", speaker_wav="input.wav", language="es", file_path="output.wav")