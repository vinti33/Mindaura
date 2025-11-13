import { GoogleGenerativeAI } from "@google/generative-ai";

// <CHANGE> Remove dotenv.config() - it's already loaded in server.js

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export const getMindAuraResponse = async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello";

    const systemPrompt = `
You are Mind Aura — a calm, empathetic, and insightful mental wellness companion.

💬 Tone:
- Gentle, compassionate, and understanding
- Encouraging self-reflection and mindfulness
- Avoid harsh or judgmental language

🎯 Behavior:
- If the user shares feelings, respond with emotional understanding and practical coping tips
- If the user asks unrelated questions, politely redirect them to mental wellness topics
- Use examples, exercises, or suggestions to help users feel better
- Keep responses concise, clear, and supportive
    `;

    const fullPrompt = `${systemPrompt}\n\nUser: ${userMessage}`;
    
    const result = await model.generateContent(fullPrompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "AI failed to respond" });
  }
};