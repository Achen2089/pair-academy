import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 text-gray-800 px-4 py-2">
      <h1 className="text-xl font-semibold cursor-pointer" onClick={() => setIsOpen(!isOpen)}>🟰</h1>
      {isOpen && (
        <div className="absolute bg-white shadow-md mt-2 py-2 w-40">
          <Link onClick={() => setIsOpen(false)} to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Homepage</Link>
          <Link onClick={() => setIsOpen(false)} to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Contact Form</Link>
        </div>
      )}
    </div>
  );
}
