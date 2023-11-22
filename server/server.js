/* eslint-disable no-undef */
import axios from "axios";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Code Compiliation APIs

app.post('/compile', async (req, res) => {
    try {
        const response = await axios({
          method: "POST",
          url: process.env.RAPID_API_URL,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "Content-Type": "application/json",
            "X-RapidAPI-Host": process.env.RAPID_API_HOST,
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          },
          data: {
            language_id: req.body.language_id,
            source_code: req.body.source_code,
          }
        });
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

app.get('/check-status/:token', async (req, res) => {
    try {
      const token = req.params.token;
      const response = await axios({
        method: "GET",
        url: `${process.env.RAPID_API_URL}/${token}`,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "X-RapidAPI-Host": process.env.RAPID_API_HOST,
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Pair Programming APIs

app.post('/chat', async (req, res) => {

});

app.post('/load-lesson', async (req, res) => {

}); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});