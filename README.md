# 🐰 Ask Lina - Voice-First AI Companion for Kids

Ask Lina is an interactive voice-first web application designed specifically for young children. It features Lina, a friendly AI bunny character who engages in natural conversations, plays games, and tells stories through voice interaction.

## ✨ Features

- **Voice-First Interaction**: Complete hands-free experience using speech recognition
- **Personalized Experience**: Lina remembers and uses the child's name
- **Multiple Modes**:
  - **Chat Mode**: Natural conversations with Lina
  - **I Spy Game**: Interactive guessing game (coming soon)
  - **Story Mode**: Short stories narrated by Lina (coming soon)
- **Auto-Listening**: Automatically starts listening after Lina finishes speaking
- **Child-Friendly Design**: Simple, colorful interface with engaging animations
- **Real-time Speech Recognition**: Uses Web Speech API for instant voice input
- **AI-Powered Responses**: Powered by OpenAI GPT-3.5/4o for intelligent conversations

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Python 3.7+
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Ask-Lina
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   python app.py
   ```
   The Flask server will run on `http://localhost:5001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The React app will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## 🎮 How to Use

1. **Start the Experience**: Click "Start Talking with Lina" to begin
2. **Introduce Yourself**: Lina will ask for your name - just say it!
3. **Choose an Activity**: Lina will present options:
   - Say "chat" to have a conversation
   - Say "play" or "spy" for I Spy game (coming soon)
   - Say "story" to hear a story (coming soon)
4. **Enjoy the Interaction**: Lina will respond with voice and text, then automatically listen for your next input

## 🏗️ Project Structure

```
Ask Lina/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── config.py           # Configuration settings
│   ├── openai_utils.py     # OpenAI API integration
│   └── requirements.txt    # Python dependencies
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AudioPlayer.jsx
│   │   │   ├── LinaAnimation.jsx
│   │   │   ├── MainMenu.jsx
│   │   │   └── VoiceInput.jsx
│   │   ├── App.jsx         # Main application component
│   │   ├── api.js          # API communication
│   │   └── utils.js        # Utility functions
│   └── package.json        # Node.js dependencies
└── README.md              # This file
```

## 🔧 Technical Details

### Frontend (React)
- **Speech Recognition**: Web Speech API for voice input
- **Audio Playback**: HTML5 Audio API for TTS responses
- **State Management**: React hooks for application state
- **Styling**: Inline styles with CSS animations

### Backend (Flask)
- **API Endpoints**: `/chat` for conversations, `/tts` for text-to-speech
- **OpenAI Integration**: GPT-3.5/4o for chat, TTS-1 for voice synthesis
- **CORS Support**: Cross-origin requests enabled for development

### AI Features
- **Conversation**: Context-aware responses using child's name and age
- **Voice Synthesis**: Natural-sounding voice with friendly, child-appropriate tone
- **Safety**: Content filtering to ensure child-friendly responses

## 🎨 Customization

### Voice Settings
Modify the TTS instructions in `backend/openai_utils.py` to change Lina's voice characteristics.

### UI Customization
Update the styling in React components to match your preferred design.

### AI Personality
Adjust the system prompt in `backend/openai_utils.py` to modify Lina's personality and responses.

## 🔒 Privacy & Safety

- **No Data Storage**: Conversations are not stored permanently
- **Child-Safe Content**: AI responses are filtered for age-appropriate content
- **Local Processing**: Speech recognition happens in the browser
- **Secure API**: OpenAI API calls are made server-side

## 🚧 Coming Soon

- **I Spy Game**: Interactive object guessing game
- **Story Mode**: AI-generated short stories
- **Progress Tracking**: Save child's preferences and progress
- **Parent Dashboard**: Monitor and customize child's experience
- **Offline Mode**: Basic functionality without internet connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Web Speech API for voice recognition
- React community for the excellent framework
- Flask community for the Python web framework

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for kids everywhere** 