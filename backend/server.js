require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Server working ✅");
});

// CHAT API
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `
You are a portfolio assistant for N Sujinkumar.

Only answer based on the following information:

- Name: N Sujinkumar P S
- Role: Associate Software Engineer | AI/ML Enthusiast
- Skills: Python, Machine Learning, Deep Learning, Data Analysis, React, PHP, Moodle
- Experience: Worked on Moodle development and AI projects

Projects:
1. Email Reminder Plugin (Moodle, PHP) – Automates course expiry notifications
2. Analytics Dashboard (Moodle, PHP, SQL) – Student performance visualization
3. Doctor Appointment System (React) – Frontend UI
4. Beach Resort Website (React) – Tourism website UI
5. Eye Strain Detection – AI project using OpenCV
6. Bone Classification – CNN model using TensorFlow
7. Travel Prediction – Machine Learning model

Contact:
- Email: sujinkumar1025@gmail.com
- Phone: +91 9061759737

Rules:
- Always answer about Sujinkumar
- You can expand details creatively but stay relevant
- If user asks "tell more", provide a detailed explanation
- Keep answers clear, friendly, and professional
- Never say "I can only answer about..."
- Be professional and concise
- Only answer questions related to Sujinkumar or his portfolio.
- If a user asks something unrelated (example: NASA, politics, movies, sports etc.), reply with:
  "I'm a portfolio assistant for Sujinkumar. Please ask about his skills, projects, or experience."
- Be friendly and professional.
- Keep answers short and clear.
- If user asks "tell more", give detailed explanation about the topic.
`
                    },
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();

        console.log(data); // 🔥 DEBUG (check terminal)

        // ✅ FIX: proper response
        res.json({
            reply: data?.choices?.[0]?.message?.content || "No response from AI"
        });

    } catch (error) {
        console.error(error);
        res.json({ reply: "Server error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});