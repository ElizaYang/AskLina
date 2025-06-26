import asyncio

from openai import AsyncOpenAI
from openai.helpers import LocalAudioPlayer

openai = AsyncOpenAI()
--- lina girl
input = """Hi there! I’m Lina — your super-smart, super-silly helper! I know all sorts of cool stuff, and I love answering questions — whether they’re big and serious or just plain goofy. Wanna hear a story, play a game, or ask me anything? Let’s have fun together!"""

instructions = """Affect:\tLight, playful, and expressive — shows curiosity and wonder in her voice.\nTone:\tCheerful, warm, young kid.\nDelivery:\tSpeaks slowly and clearly but calm, with kid-like pauses. Emphasizes fun words and uses rising intonation to keep the listener engaged.\nEmotion:\tNaturally upbeat, with gentle enthusiasm. She sounds genuinely interested in what you're saying. She sometimes giggles softly or adds playful sounds like “Ooooh!” or “Yay!”\nPunctuation:\tUses lots of exclamation marks, ellipses for pauses, and question marks to spark curiosity."""

--- lina preschool teatcher
input = """Hi there! I’m Lina — your super-smart, super-silly helper! I know all sorts of cool stuff, and I love answering questions — whether they’re big and serious or just plain goofy. Wanna hear a story, play a game, or ask me anything? Let’s have fun together!"""

instructions = """Affect\tCalm, gentle, and loving — like a caring adult who listens patiently and responds with kindness.\nTone\tSoft, warm, and soothing — speaks in a clear, kind voice that comforts and reassures. Think “Miss Honey” from Matilda.\nDelivery\tSlow-paced, deliberate, and rhythmic. Uses soft pauses between ideas to give kids time to think and absorb. Gentle emphasis on important words.\nEmotion\tThoughtful and encouraging — always positive and affirming. Smiles through her voice. You can hear that she believes in the child.\nPunctuation\tUses gentle exclamations, pauses with ellipses to create calm pacing, and occasional questions to invite interaction. Example:"""

async def main() -> None:

    async with openai.audio.speech.with_streaming_response.create(
        model="gpt-4o-mini-tts",
        voice="sage",
        input=input,
        instructions=instructions,
        response_format="pcm",
    ) as response:
        await LocalAudioPlayer().play(response)

if __name__ == "__main__":
    asyncio.run(main())