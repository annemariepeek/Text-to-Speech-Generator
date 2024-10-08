from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise ValueError("API Key not found. Ensure the .env file contains 'OPENAI_API_KEY'.")

client = openai.OpenAI(api_key=api_key)

@app.route('/api/convert', methods=['POST'])
def convert_text_to_speech():
    data = request.get_json()  
    text = data.get('text')
    voice = data.get('voice')

    if not text:
        return jsonify({"error": "Text input is required"}), 400

    if len(text) > 5000:
        text = text[:5000]  

    response = client.audio.speech.create(
        model="tts-1",
        voice=voice,
        input=text
    )

    audio_file_path = 'output_audio.mp3'
    with open(audio_file_path, 'wb') as audio_file:
        audio_file.write(response.content)

    return send_file(audio_file_path, mimetype='audio/mpeg')

if __name__ == '__main__':
    app.run(debug=True)
