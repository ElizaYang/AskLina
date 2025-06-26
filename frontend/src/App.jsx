import React, { useState, useCallback } from 'react';
import LinaAnimation from './components/LinaAnimation';
import VoiceInput from './components/VoiceInput';
import MainMenu from './components/MainMenu';
import AudioPlayer from './components/AudioPlayer';
import { sendChat, getTTS } from './api';

function App() {
  const [step, setStep] = useState('start'); // start, greeting, name_confirmation, chat_intro, menu, chat, play, story
  const [childName, setChildName] = useState('');
  const [childAge] = useState(4);
  const [linaResponse, setLinaResponse] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [greetingAudio, setGreetingAudio] = useState(null);

  const getLinaState = () => {
    if (isLoading) return 'thinking';
    if (isSpeaking) return 'speaking';
    if (isListening) return 'listening';
    return step;
  };

  const startExperience = async () => {
    setStep('greeting');
    try {
      const greetingText = "Hi there! I'm Lina. What's your name?";
      const audio = await getTTS(greetingText);
      setGreetingAudio(audio);
      setIsSpeaking(true);
    } catch (error) {
      console.error('Error creating greeting audio:', error);
      // Fallback: just show the text prompt
      setStep('greeting');
    }
  };

  const handleGreetingEnded = () => {
    setIsSpeaking(false);
    // Auto-start listening after greeting finishes
    setTimeout(() => {
      window.dispatchEvent(new Event('startListening'));
    }, 500);
  };

  const handleVoiceInput = useCallback(async (text) => {
    if (step === 'greeting') {
      // Capture child's name from greeting
      setChildName(text);
      setStep('name_confirmation');
      
      // Generate Lina's response with the child's name
      try {
        const responseText = `Nice to meet you, ${text}! What would you like to do? You can chat with me, play I Spy, or listen to a short story.`;
        const audio = await getTTS(responseText);
        setAudioBlob(audio);
        setLinaResponse(responseText);
        setIsSpeaking(true);
      } catch (error) {
        console.error('Error creating name confirmation audio:', error);
        // Fallback to menu
        setStep('menu');
      }
    } else if (step === 'name_confirmation') {
      // User responded to the menu options - parse their choice
      const lowerText = text.toLowerCase();
      if (lowerText.includes('chat') || lowerText.includes('talk')) {
        setStep('chat_intro');
        // Generate Lina's chat intro message
        try {
          const responseText = `Great! What would you like to ask me?`;
          const audio = await getTTS(responseText);
          setAudioBlob(audio);
          setLinaResponse(responseText);
          setIsSpeaking(true);
        } catch (error) {
          console.error('Error creating chat intro audio:', error);
          setStep('chat');
        }
      } else if (lowerText.includes('spy') || lowerText.includes('play') || lowerText.includes('game')) {
        setStep('play');
      } else if (lowerText.includes('story') || lowerText.includes('read')) {
        setStep('story');
      } else {
        // If unclear, ask again
        try {
          const responseText = `I didn't quite catch that. Would you like to chat with me, play I Spy, or listen to a story?`;
          const audio = await getTTS(responseText);
          setAudioBlob(audio);
          setLinaResponse(responseText);
          setIsSpeaking(true);
        } catch (error) {
          console.error('Error creating clarification audio:', error);
          setStep('menu');
        }
      }
    } else if (step === 'chat_intro') {
      // User's first question in chat mode
      setStep('chat');
      // Handle the first chat question
      setIsLoading(true);
      try {
        // Get Lina's text response
        const chatResponse = await sendChat(text, childName, childAge);
        setLinaResponse(chatResponse.response);
        
        // Get Lina's audio response
        const audio = await getTTS(chatResponse.response);
        setAudioBlob(audio);
        setIsSpeaking(true); // Start speaking animation
      } catch (error) {
        console.error('Error in chat:', error);
        setLinaResponse('Sorry, I had trouble understanding that. Can you try again?');
      } finally {
        setIsLoading(false);
      }
    } else if (step === 'chat') {
      // Handle chat conversation
      setIsLoading(true);
      try {
        // Get Lina's text response
        const chatResponse = await sendChat(text, childName, childAge);
        setLinaResponse(chatResponse.response);
        
        // Get Lina's audio response
        const audio = await getTTS(chatResponse.response);
        setAudioBlob(audio);
        setIsSpeaking(true); // Start speaking animation
      } catch (error) {
        console.error('Error in chat:', error);
        setLinaResponse('Sorry, I had trouble understanding that. Can you try again?');
      } finally {
        setIsLoading(false);
      }
    }
  }, [step, childName, childAge]);

  const handleMenuSelection = useCallback((option) => {
    if (option === 'chat') {
      setStep('chat');
      setLinaResponse('');
      setAudioBlob(null);
    } else {
      // TODO: Implement play and story modes
      setStep(option);
    }
  }, []);

  const handleAudioEnded = useCallback(() => {
    // Stop speaking animation when audio finishes
    setIsSpeaking(false);
    
    // Auto-start listening after Lina finishes speaking in chat mode, name confirmation, or chat intro
    if (step === 'chat' || step === 'name_confirmation' || step === 'chat_intro') {
      setTimeout(() => {
        window.dispatchEvent(new Event('startListening'));
      }, 1000); // Wait 1 second before starting to listen
    }
  }, [step]);

  const handleVoiceInputState = useCallback((listening) => {
    setIsListening(listening);
  }, []);

  return (
    <div className="App" style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <LinaAnimation state={getLinaState()} />
      
      {step === 'start' && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h1 style={{ color: '#4ecdc4', marginBottom: '20px' }}>🐰 Ask Lina</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
            Your friendly AI companion for kids!
          </p>
          <button 
            onClick={startExperience}
            style={{ 
              padding: '20px 40px', 
              backgroundColor: '#4ecdc4', 
              color: 'white', 
              border: 'none', 
              borderRadius: '30px',
              fontSize: '1.3rem',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            🎤 Start Talking with Lina
          </button>
        </div>
      )}
      
      {step === 'greeting' && (
        <div>
          {/* Hidden audio player for greeting */}
          {greetingAudio && (
            <AudioPlayer 
              audioBlob={greetingAudio} 
              onEnded={handleGreetingEnded}
            />
          )}
          
          <VoiceInput 
            prompt={"Hi there! I'm Lina. What's your name?"} 
            onResult={handleVoiceInput}
            onListeningChange={handleVoiceInputState}
          />
        </div>
      )}
      
      {step === 'name_confirmation' && (
        <div>
          <VoiceInput 
            prompt={`Nice to meet you, ${childName}! What would you like to do? You can chat with me, play I Spy, or listen to a short story.`} 
            onResult={handleVoiceInput}
            onListeningChange={handleVoiceInputState}
          />
          
          {linaResponse && (
            <div style={{ 
              margin: '20px 0',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #4ecdc4'
            }}>
              <h3>🐰 Lina says:</h3>
              <p>{linaResponse}</p>
            </div>
          )}
          
          {audioBlob && (
            <AudioPlayer 
              audioBlob={audioBlob} 
              onEnded={handleAudioEnded}
            />
          )}
        </div>
      )}
      
      {step === 'menu' && (
        <MainMenu onSelect={handleMenuSelection} />
      )}
      
      {step === 'chat_intro' && (
        <div>
          <VoiceInput 
            prompt="Great! What would you like to ask me?" 
            onResult={handleVoiceInput}
            onListeningChange={handleVoiceInputState}
          />
          
          {linaResponse && (
            <div style={{ 
              margin: '20px 0',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #4ecdc4'
            }}>
              <h3>🐰 Lina says:</h3>
              <p>{linaResponse}</p>
            </div>
          )}
          
          {audioBlob && (
            <AudioPlayer 
              audioBlob={audioBlob} 
              onEnded={handleAudioEnded}
            />
          )}
        </div>
      )}
      
      {step === 'chat' && (
        <div>
          <VoiceInput 
            prompt="What would you like to ask me?" 
            onResult={handleVoiceInput}
            onListeningChange={handleVoiceInputState}
          />
          
          {linaResponse && (
            <div style={{ 
              margin: '20px 0',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px solid #4ecdc4'
            }}>
              <h3>🐰 Lina says:</h3>
              <p>{linaResponse}</p>
            </div>
          )}
          
          {audioBlob && (
            <AudioPlayer 
              audioBlob={audioBlob} 
              onEnded={handleAudioEnded}
            />
          )}
        </div>
      )}
      
      {step === 'play' && (
        <div>
          <h2>🎮 Play Mode</h2>
          <p>Coming soon! I Spy and other games will be here.</p>
          <button onClick={() => setStep('menu')}>Back to Menu</button>
        </div>
      )}
      
      {step === 'story' && (
        <div>
          <h2>📚 Story Mode</h2>
          <p>Coming soon! Short stories will be here.</p>
          <button onClick={() => setStep('menu')}>Back to Menu</button>
        </div>
      )}
    </div>
  );
}

export default App; 