// ChatWindow.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'; // You can choose any style you prefer
import WordByWordMessage from './WordByWordMessage'; // Import the WordByWordMessage component


type Message = {
  type: 'user' | 'tutor';
  content: string;
};

interface ChatWindowProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, setMessages }) => {  
  const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL as string;
  const [inputValue, setInputValue] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const sendMessageToServer = async (userInput: string) => {
    setIsSending(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/chat`, { message: userInput });
      if (response.data && response.data.message) {
        setMessages(messages => [...messages, { type: 'tutor', content: response.data.message }]);
        setIsSending(false);
      }
    } catch (error) {
      console.error("Error sending message to server", error);
      setIsSending(false);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '' && !isSending) {
      setMessages(messages => [...messages, { type: 'user', content: inputValue }]);
      sendMessageToServer(inputValue.trim());
      setInputValue('');
    }
  };

  const renderMarkdown = (content: string) => {
    const renderer = new marked.Renderer();
    renderer.code = (code, language) => {
      const rawMarkup = new SyntaxHighlighter({ language, children: code, style: nord });
      return ReactDOMServer.renderToString(rawMarkup);
    };
    return marked(content, { renderer, breaks: true });
  };

  const renderMessage = (message: Message, index: number) => {
    const messageClasses = 'bg-white shadow p-4 rounded-lg w-full';
    const formattedContent = renderMarkdown(message.content);

    if (message.type === 'tutor') {
      return (
        <div key={index} className={`my-2 w-full ${messageClasses}`}>
          <div className="font-semibold">{message.type.toUpperCase()}</div>
          <WordByWordMessage htmlContent={formattedContent} delay={0} />
        </div>
      );
    }

    return (
      <div key={index} className={`my-2  w-full ${messageClasses}`}>
        <div className="font-semibold">{message.type.toUpperCase()}</div>
        <span dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
      <div className="p-4 bg-white shadow-md sticky bottom-0">
        <form onSubmit={handleFormSubmit} className="flex">
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange}
            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSending}
            placeholder="Type your message..."
          />
          <button 
            type="submit" 
            disabled={isSending}
            className={`px-4 py-2 rounded-lg transition-colors duration-150 ${isSending ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {isSending ? '🧠 Thinking...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
