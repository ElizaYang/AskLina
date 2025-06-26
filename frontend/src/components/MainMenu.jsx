import React from 'react';

function MainMenu({ onSelect }) {
  return (
    <div>
      <p>Do you want to chat, play I Spy, or hear a short story?</p>
      <button onClick={() => onSelect('chat')}>Chat</button>
      <button onClick={() => onSelect('play')}>Play I Spy</button>
      <button onClick={() => onSelect('story')}>Short Story</button>
    </div>
  );
}

export default MainMenu; 