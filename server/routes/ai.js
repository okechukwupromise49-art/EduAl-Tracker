const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


router.post('/ask-ai', async (req, res) => {
  try {
    const { messages: prompt } = req.body;   // renamed for clarity

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      console.error("GEMINI_API_KEY is missing in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    console.log("KEY:", process.env.GEMINI_API_KEY);
    console.log("PROMPT:", prompt);

    const MODEL = "gemini-2.5-flash";   // This is valid in 2026
    

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          role: "user", 
          parts: [{ text: prompt }] 
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        systemInstruction: {
          parts: [{
            text: "You are a helpful academic assistant for university students. Answer questions related to education, CGPA, study techniques, course planning, time management, exam preparation, and academic goals. Stay focused on academic topics. Be clear, encouraging, and practical."
          }]
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error ${response.status}:`, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text 
      || "Sorry, I couldn't generate a response. Please try again.";

    res.json({ text: aiText });

  } catch (err) {
    console.error("AI Proxy Error:", err.message || err);
    res.status(500).json({
      error: "Failed to connect to AI. Please try again later."
    });
  }
});

module.exports = router;