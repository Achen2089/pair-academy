import { useState } from 'react';


export default function ChatWindow() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
    
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">ChatInteraction</h1>
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li key={index} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <div className={`bg-gray-200 rounded-lg p-2 ${index % 2 === 0 ? 'ml-2' : 'mr-2'}`}>
                  {message}
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={handleFormSubmit} className="mt-4 flex">
            <input type="text" value={inputValue} onChange={handleInputChange} className="border border-gray-400 p-2 rounded-lg w-full" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
