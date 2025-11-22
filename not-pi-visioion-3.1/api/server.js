// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/*  
=========================================================
    GEMINI NORMAL RESPONSE (NON-STREAMING)
=========================================================
*/

app.post("/api/gemini", async (req, res) => {
  const { prompt, model = "gemini-2.5-pro" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!data.candidates || !data.candidates[0]) {
      return res.status(500).json({ error: "No Gemini response" });
    }

    const text = data.candidates[0].content.parts[0].text;

    res.json({
      success: true,
      content: text,
    });
  } catch (err) {
    console.error("Gemini Normal Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Proxy endpoint expected by frontend
app.post("/api/generate", async (req, res) => {
  req.body = req.body || {};
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt missing" });
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    res.json({ success: true, content: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*  
=========================================================
    GEMINI STREAMING RESPONSE (SSE)
=========================================================
*/

app.post("/api/gemini-stream", async (req, res) => {
  const { prompt, model = "gemini-2.5-flash-native-audio-preview-09-2025" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  try {
    // Enable streaming (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    response.body.on("data", (chunk) => {
      res.write(`data: ${chunk.toString()}\n\n`);
    });

    response.body.on("end", () => {
      res.write("data: [DONE]\n\n");
      res.end();
    });

    response.body.on("error", (err) => {
      console.error("Stream error:", err);
      res.write(`event: error\ndata: ${JSON.stringify(err)}\n\n`);
      res.end();
    });
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify(err)}\n\n`);
    res.end();
  }
});


/*  
=========================================================
    CHATGPT STREAMING (COMMENTED FOR LATER USE)
=========================================================
*/

// import OpenAI from "openai";
// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// app.post("/api/chatgpt-stream", async (req, res) => {
//   const { prompt } = req.body;

//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   const stream = await client.chat.completions.create({
//     model: "gpt-4.1",
//     stream: true,
//     messages: [{ role: "user", content: prompt }],
//   });

//   for await (const part of stream) {
//     const text = part.choices?.[0]?.delta?.content || "";
//     if (text) res.write(`data: ${JSON.stringify(text)}\n\n`);
//   }

//   res.write("data: [DONE]\n\n");
//   res.end();
// });


/*  
=========================================================
    FALLBACK → index.html
=========================================================
*/

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/*  
=========================================================
    START SERVER
=========================================================
*/

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 NPVision Server running at http://localhost:${PORT}`);
  });
}

export default app;
