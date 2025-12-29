import React from 'react';
import { X } from 'lucide-react';

const ChatHeader = ({ onClose }) => {
  return (
    <div className="bg-blue-600 px-6 py-4 flex items-center justify-between rounded-t-lg">
      <div>
        <h2 className="text-lg font-bold text-white">Chat Support</h2>
        <p className="text-xs text-blue-100">We're here to help</p>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:bg-blue-700 rounded p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        aria-label="Close chat"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatHeader;
