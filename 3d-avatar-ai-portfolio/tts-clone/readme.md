Build Docker

This could take a few minutes.

git clone https://github.com/myshell-ai/MeloTTS.git
cd MeloTTS
docker build -t melotts . 
Run Docker

docker run -it -p 8888:8888 melotts
If your local machine has GPU, then you can choose to run:

docker run --gpus all -it -p 8888:8888 melotts
Then open http://localhost:8888 in your browser to use the app.

DATASET
https://github.com/myshell-ai/MeloTTS/blob/main/docs/training.md

PTH

python preprocess_text.py --metadata data/example/metadata.list 

MELO TTS + PTH


22050 Hz - wav - Mono


https://github.com/myshell-ai/MeloTTS/blob/main/docs/training.md?plain=1


We recommend using 44100Hz