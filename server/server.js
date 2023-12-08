/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Controllers
import CompileController from './controllers/CompileController.js';
import StatusController from './controllers/StatusController.js';
import ChatController from './controllers/ChatController.js';

// Initialize dotenv
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Code Compiliation APIs

app.post('/compile', CompileController.compile);
app.get('/check-status/:token', StatusController.checkStatus);

// Pair Programming APIs

app.post('/chat', ChatController.chat);
app.post('/load-context', ChatController.loadContext);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});