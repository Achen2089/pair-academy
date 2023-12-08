// ChatMessage.js

class ChatMessage {
    constructor(userId, content, role) {
      this.userId = userId;
      this.content = content;
      this.role = role; // 'user' or 'assistant'
    }
  
    formatForAPI() {
      return {
        role: this.role,
        content: this.content
      };
    }
  }
  
export default ChatMessage;
  