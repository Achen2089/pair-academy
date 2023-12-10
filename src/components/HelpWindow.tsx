import React from 'react';

export default function HelpWindow() {
  return (
    <div className="bg-gray-100 text-gray-900">
      <div className="container mx-auto p-4">
        {/* Lessons Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Lessons</h2>
          <p>Select a module to see relevant lessons. Start a lesson by pressing the load lesson button.</p>
        </div>

        {/* Chat Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Chat</h2>
          <p>Chat with an AI tutor. Code outputs are highlighted for clarity.</p>
        </div>

        {/* Commands Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Commands</h2>
          <p>Type / for a menu with commands: /clear, /debug, /code.</p>
        </div>

        {/* Diagram Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Diagram</h2>
          <p>Create and manipulate diagrams with this interactive tool.</p>
        </div>

        {/* Code Editor Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Code Editor</h2>
          <p>Select a programming language, write code, and execute it to see the output.</p>
        </div>

        {/* Extra Help Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Extra Help</h2>
          <p>Contact <a href="mailto:achen2089work@gmail.com" className="text-blue-500 hover:text-blue-700">achen2089work@gmail.com</a> for additional assistance.</p>
        </div>
      </div>
    </div>
  );
}
