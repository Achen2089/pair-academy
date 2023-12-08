/* eslint-disable no-undef */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CompileController = {
  async compile(req, res) {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.RAPID_API_URL,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "content-type": "application/json",
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
  }
};

export default CompileController;
