import { useState } from 'react';
import axios from 'axios';


export default function ChatWindow() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const displayResponseWordByWord = (responseMessage: string, index = 0, allWords : string[]) => {
    if (index < allWords.length) {
      setMessages(messages => {
        const newMessages = [...messages];
        newMessages[newMessages.length - 1] += (index === 0 ? "" : " ") + allWords[index];
        return newMessages;
    });
      setTimeout(() => displayResponseWordByWord(responseMessage, index + 1, allWords), 50);
    } 
    else {
      setIsSending(false);
    }
  };

  const sendMessageToServer = async (userInput: string) => {
    setIsSending(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/chat`, {message : userInput});
      if (response.data && response.data.message) {
        setMessages(messages => [...messages, ""]);
        displayResponseWordByWord(response.data.message, 0, response.data.message.split(' '));
      }
    } catch (error) {
      console.error("Error sending message to server", error)
      setMessages(messages => [...messages, "Error sending message to server"]);
      setIsSending(false);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    if (inputValue.trim() !== '' && !isSending) {
      setMessages(messages => [...messages, inputValue]);
      sendMessageToServer(inputValue.trim());
      setInputValue('');
    }
    
  };


  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Pair Programmer</h1>
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li key={index} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg p-2 ${index % 2 === 0 ? 'bg-green-200 ml-2' : 'bg-blue-200 mr-2'}`}>
                  {message}
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={handleFormSubmit} className="mt-4 flex">
            <input type="text" value={inputValue} onChange={handleInputChange} className="border border-gray-400 p-2 rounded-lg w-full" />
            <button type="submit" disabled={isSending} className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">
              {isSending ? '🧠 Thinking' : 'Send'}
        </button>
          </form>
        </div>
      </div>
    </div>
  );
}
