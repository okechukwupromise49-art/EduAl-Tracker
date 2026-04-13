const dotenv = require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require("mongoose")
const app = express();

const gpaRoutes = require("./routes/gpa");
const registerRoutes = require("./routes/register");
const cgpaRoutes = require("./routes/cgpa");
const aiRoutes = require("./routes/ai");



const notificationRoutes = require("./routes/notification");
const cookieParser = require("cookie-parser");

console.log(aiRoutes)
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://edu-al-tracker.vercel.app"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === "Only images allowed") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));



app.use("/api/gpa", gpaRoutes);
app.use("/api/auth", registerRoutes);
app.use("/api/cgpa", cgpaRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/ai", aiRoutes);

app.get("/health", (req,res) => {
  res.status(200).send("working fine 👍👍👍👍")
})

app.get("/", (req,res) => {
  res.status(200).send("working ❤️❤️❤️👍👍👍👍")
})


app.post('/ask-ai', async (req, res) => {
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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});