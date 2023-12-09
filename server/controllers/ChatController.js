/* eslint-disable no-undef */
// ChatHistoryController.js

import OpenAI from 'openai';
import dotenv from 'dotenv';
import ChatMessage from '../models/chatMessage.js';
import ChatHistory from '../models/chatHistory.js';
import generateTutorPromptForlesson from '../utils/generateTutorPrompt.js';
import generateInitialMessage from '../utils/generateInitialMessage.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatHistory = new ChatHistory();

const ChatHistoryController = {
  async chat(req, res) {
    try {
      const { userId, message } = req.body;
      const userMessage = new ChatMessage(userId, message, 'user');
      chatHistory.addMessage(userId, userMessage);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chatHistory.getFullHistory(userId),
      });

      const botMessage = new ChatMessage(userId, response?.choices?.[0]?.message?.content, 'assistant');
      chatHistory.addMessage(userId, botMessage);

      res.json({ status: "Success", message: botMessage.content });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async loadContext(req, res) {
    try {
      const { userId, lesson, language } = req.body;
      const contextMessage = generateTutorPromptForlesson(lesson, language);
      
      console.log(contextMessage);
      const contextChatMessage = new ChatMessage(userId, contextMessage, 'system');
      chatHistory.setContext(userId, contextChatMessage);

      
      const initalMessage = generateInitialMessage(lesson, language);
      const initalChatMessage = new ChatMessage(userId, initalMessage, 'assistant');
      chatHistory.addMessage(userId, initalChatMessage);

      res.json({ status: "Success", message: initalChatMessage.content });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default ChatHistoryController;
