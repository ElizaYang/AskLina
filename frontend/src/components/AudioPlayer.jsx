import React, { useState, useRef, useEffect } from 'react';

function AudioPlayer({ audioBlob, onEnded }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Auto-play when audioBlob changes
  useEffect(() => {
    if (audioBlob && audioRef.current) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current.src = url;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('Auto-play failed:', error);
        // Fallback: show play button if auto-play is blocked
        setIsPlaying(false);
      });
    }
  }, [audioBlob]);

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded) onEnded();
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      
      {audioBlob && (
        <button
          onClick={isPlaying ? stopAudio : playAudio}
          style={{
            padding: '10px 20px',
            backgroundColor: isPlaying ? '#ff6b6b' : '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 auto'
          }}
        >
          {isPlaying ? '⏸️ Stop' : '🔊 Replay'}
        </button>
      )}
    </div>
  );
}

export default AudioPlayer; 