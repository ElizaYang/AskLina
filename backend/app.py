from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
from openai_utils import get_lina_response, get_tts_audio

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_text = data.get('text', '')
    child_name = data.get('child_name', 'Mia')
    child_age = data.get('child_age', 4)
    response_text = get_lina_response(user_text, child_name, child_age)
    return jsonify({'response': response_text})

@app.route('/tts', methods=['POST'])
def tts():
    data = request.json
    text = data.get('text', '')
    audio_data = get_tts_audio(text)
    
    if audio_data is None:
        return jsonify({'error': 'Failed to generate audio'}), 500
    
    audio_stream = io.BytesIO(audio_data)
    audio_stream.seek(0)
    return send_file(audio_stream, mimetype='audio/mpeg', as_attachment=True, download_name='lina.mp3')

if __name__ == '__main__':
    app.run(debug=True, port=5001) 