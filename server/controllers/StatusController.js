/* eslint-disable no-undef */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CheckStatusController = {
  async checkStatus(req, res) {
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
  }
};

export default CheckStatusController;
