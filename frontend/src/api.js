// API calls to backend
const BACKEND_URL = 'http://localhost:5001';

export async function sendChat(text, childName = 'Mia', childAge = 4) {
  try {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        child_name: childName,
        child_age: childAge
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat:', error);
    return { response: 'Sorry, I had trouble understanding that. Can you try again?' };
  }
}

export async function getTTS(text) {
  try {
    const response = await fetch(`${BACKEND_URL}/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: text }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Error getting TTS:', error);
    return null;
  }
} 