# Placeholder for OpenAI API helper functions

import openai
from config import OPENAI_API_KEY

def get_lina_response(user_text, child_name, child_age):
    system_prompt = (
        f"You are Lina, a kind, curious bunny who talks like a preschool teacher to a {child_age}-year-old named {child_name}. "
        "Use simple words. Keep responses short and friendly. No scary, violent, or negative topics."
    )
    try:
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_text}
            ],
            max_tokens=80,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return "Sorry, I couldn't answer that right now. Can you try again?"

def get_tts_audio(text):
    try:
        instructions = """Voice: Warm, relaxed, gentle,and friendly, with a steady cowboy drawl that feels approachable.
                        Pacing: Slow and deliberate, pausing often to allow the listener to follow instructions comfortably.
                        Punctuation: Light and natural, with gentle pauses that create a conversational rhythm without feeling rushed.
                        Delivery: Smooth and easygoing, with a laid-back pace that reassures the listener while keeping things clear.
                        Phrasing: Simple, direct, using casual, familiar language to make help kids feel more personable.
                        Tone: Lighthearted and welcoming, encouraging,with a calm confidence."""
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        response = client.audio.speech.create(
            model="tts-1",
            voice="sage",
            input=text,
            instructions=instructions,
        )
        return response.content
    except Exception as e:
        print(f"OpenAI TTS Error: {e}")
        return None 