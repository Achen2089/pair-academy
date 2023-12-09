// ChatWindow.tsx
import React, { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
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
  code: string;
}


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, setMessages }) => {  
  const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL as string;
  const [inputValue, setInputValue] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [commands] = useState<string[]>(['/clear', '/debug', '/code']);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownHeight, setDropdownHeight] = useState<number>(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowDropdown(event.target.value.startsWith('/'));
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

  const handleCommandSelect = (command: string) => {
    // Handle different commands here
    if (command === '/clear') {
      setMessages([]);
    } else if (command === '/debug') {
      // Implement debug functionality
    } else if (command === '/code') {
      // Implement code functionality
    }
    setInputValue('');
    setShowDropdown(false);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.clientHeight);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const renderCommand = (command: string) => {
    return (
      <div
        className="p-2 hover:bg-blue-100 cursor-pointer flex items-center"
        onClick={() => handleCommandSelect(command)}
      >
        {/* Add an icon or styling specific to the command if desired */}
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{command}</span>
      </div>
    );
  };
  

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => renderMessage(message, index))}
      </div>
      <div className="p-4 bg-white shadow-md sticky bottom-0">
        <form onSubmit={handleFormSubmit} className="flex relative">
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange}
            className="flex-1 p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSending}
            placeholder="Type your message..."
          />
          {showDropdown && (
            <div 
              ref={dropdownRef} 
              className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg"
              style={{ bottom: `${dropdownHeight + 10}px`, width: '100%' }}
            >
              {commands.map((command) => renderCommand(command))}
            </div>
          )}
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
