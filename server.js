import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await fetch("https://api.openai.com/1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` // Fix: Corrected syntax
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: "512x512"
      })
    });

    // Fix: Moved this INSIDE the try block
    const data = await response.json();
    console.log("OpenAI response:", data);

    if (data.data && data.data[0].url) {
      res.json({ image: data.data[0].url });
    } else {
      res.status(500).json({ error: data.error?.message || "OpenAI error" });
    }
  } catch (error) {
    console.error("Server Crash:", error);
    res.status(500).json({ error: "Server Internal Error" });
  }
});

app.listen(5000, () => console.log("Server active on http://localhost:5000"));