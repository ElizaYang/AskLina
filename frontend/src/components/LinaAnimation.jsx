import React from 'react';

function LinaAnimation({ state }) {
  const getAnimationStyle = () => {
    const baseStyle = {
      fontSize: '4rem',
      margin: '2rem auto',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    };

    switch (state) {
      case 'greeting':
      case 'menu':
        return {
          ...baseStyle,
          animation: 'bounce 2s infinite'
        };
      
      case 'speaking':
        return {
          ...baseStyle,
          animation: 'speak 1s infinite',
          color: '#4ecdc4'
        };
      
      case 'listening':
        return {
          ...baseStyle,
          animation: 'listen 1.5s infinite',
          color: '#ff6b6b'
        };
      
      case 'thinking':
        return {
          ...baseStyle,
          animation: 'think 2s infinite',
          color: '#f39c12'
        };
      
      default:
        return baseStyle;
    }
  };

  const getLinaEmoji = () => {
    switch (state) {
      case 'greeting':
      case 'menu':
        return '🐰';
      case 'speaking':
        return '🐰💬';
      case 'listening':
        return '🐰👂';
      case 'thinking':
        return '🐰💭';
      default:
        return '🐰';
    }
  };

  const getStatusText = () => {
    switch (state) {
      case 'greeting':
        return 'Hi there! I\'m Lina!';
      case 'menu':
        return 'What would you like to do?';
      case 'speaking':
        return 'Lina is speaking...';
      case 'listening':
        return 'Lina is listening...';
      case 'thinking':
        return 'Lina is thinking...';
      default:
        return 'Hello!';
    }
  };

  return (
    <div style={getAnimationStyle()}>
      <div style={{ fontSize: '5rem' }}>{getLinaEmoji()}</div>
      <div style={{ 
        fontSize: '1.2rem', 
        color: '#666',
        fontWeight: 'bold'
      }}>
        {getStatusText()}
      </div>
      
      {/* Visual indicators */}
      {state === 'listening' && (
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ff6b6b',
            animation: 'pulse 1s infinite'
          }}></div>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ff6b6b',
            animation: 'pulse 1s infinite 0.2s'
          }}></div>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ff6b6b',
            animation: 'pulse 1s infinite 0.4s'
          }}></div>
        </div>
      )}
      
      {state === 'thinking' && (
        <div style={{
          display: 'flex',
          gap: '0.3rem',
          marginTop: '1rem'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#f39c12',
            animation: 'bounce 1s infinite'
          }}></div>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#f39c12',
            animation: 'bounce 1s infinite 0.1s'
          }}></div>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#f39c12',
            animation: 'bounce 1s infinite 0.2s'
          }}></div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes speak {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes listen {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.02) rotate(-2deg); }
          75% { transform: scale(1.02) rotate(2deg); }
        }
        
        @keyframes think {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.03) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

export default LinaAnimation; 