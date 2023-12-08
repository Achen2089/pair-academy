// ChatHistory.js

class ChatHistory {
  constructor() {
    this.histories = {};
    this.contexts = {};
  }

  addMessage(userId, message) {
    if (!this.histories[userId]) {
      this.histories[userId] = [];
    }
    this.histories[userId].push(message.formatForAPI());
  }

  setContext(userId, context) {
    this.contexts[userId] = [context.formatForAPI()];
  }

  addContext(userId, context) {
    if (!this.contexts[userId]) {
      this.contexts[userId] = [];
    }
    this.contexts[userId].push(context.formatForAPI());
  }

  getFullHistory(userId) {
    const contextMessages = this.contexts[userId] || [];
    const chatMessages = this.histories[userId] || [];
    return [...contextMessages, ...chatMessages];
  }

  getVisibleHistory(userId) {
    return this.histories[userId] || [];
  }
}

export default ChatHistory;
