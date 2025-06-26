import React, { useState, useEffect, useRef, useCallback } from 'react';

function VoiceInput({ prompt, onResult, onListeningChange }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  const onListeningChangeRef = useRef(onListeningChange);

  // Update refs when callbacks change
  useEffect(() => {
    onResultRef.current = onResult;
    onListeningChangeRef.current = onListeningChange;
  }, [onResult, onListeningChange]);

  // Initialize speech recognition once
  useEffect(() => {
    // Check if browser supports Speech Recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      setError('Speech recognition not supported in this browser');
      return;
    }

    console.log('Initializing speech recognition...');

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setTranscript('');
      setError('');
      if (onListeningChangeRef.current) onListeningChangeRef.current(true);
    };

    recognitionRef.current.onresult = (event) => {
      console.log('Speech recognition result:', event.results);
      const result = event.results[0][0].transcript;
      setTranscript(result);
      if (onResultRef.current) onResultRef.current(result);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      // Don't show aborted errors to user as they're usually harmless
      if (event.error === 'aborted') {
        console.log('Speech recognition aborted (normal behavior)');
        setIsListening(false);
        if (onListeningChangeRef.current) onListeningChangeRef.current(false);
        return;
      }
      
      // Only show other errors to the user
      if (event.error !== 'aborted') {
        setError(`Error: ${event.error}`);
      }
      setIsListening(false);
      if (onListeningChangeRef.current) onListeningChangeRef.current(false);
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      if (onListeningChangeRef.current) onListeningChangeRef.current(false);
    };

    return () => {
      if (recognitionRef.current) {
        try {
          // Only abort if it's actually running
          if (isListening) {
            recognitionRef.current.abort();
          }
        } catch (error) {
          console.log('Error during cleanup:', error);
        }
      }
    };
  }, []); // Empty dependency array - only initialize once

  // Handle startListening events separately
  const handleStartListening = useCallback(() => {
    if (isListening) {
      return;
    }
    
    if (!recognitionRef.current) {
      return;
    }
    
    setTimeout(() => {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error auto-starting speech recognition:', error);
        setError(`Failed to start listening: ${error.message}`);
      }
    }, 500);
  }, [isListening]);

  // Set up event listener
  useEffect(() => {
    window.addEventListener('startListening', handleStartListening);
    return () => {
      window.removeEventListener('startListening', handleStartListening);
    };
  }, [handleStartListening]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        if (error.name === 'NotAllowedError') {
          setError('Microphone permission needed. Please allow microphone access and try again.');
        } else {
          setError(`Failed to start: ${error.message}`);
        }
      }
    } else {
      console.log('Cannot start: already listening or recognition not available');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Error stopping speech recognition:', error);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{prompt}</p>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '5px',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        {isListening ? (
          <div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              backgroundColor: '#ff6b6b', 
              margin: '0 auto 10px',
              animation: 'pulse 1.5s infinite'
            }}></div>
            <p>Listening... Speak now!</p>
            <button onClick={stopListening} style={{ 
              padding: '10px 20px', 
              backgroundColor: '#ff6b6b', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Stop Listening
            </button>
          </div>
        ) : (
          <button onClick={startListening} style={{ 
            padding: '15px 30px', 
            backgroundColor: '#4ecdc4', 
            color: 'white', 
            border: 'none', 
            borderRadius: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}>
            🎤 Start Listening
          </button>
        )}
      </div>

      {transcript && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '5px',
          marginTop: '10px'
        }}>
          <strong>You said:</strong> {transcript}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default VoiceInput; 