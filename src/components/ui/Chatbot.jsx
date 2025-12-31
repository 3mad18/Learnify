import React, { useState } from 'react';


const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] font-sans ${open ? '' : ''}`}>
      {!open ? (
        <div
          className="bg-blue-600 text-white rounded-full px-6 py-2 shadow-md cursor-pointer transition-shadow hover:shadow-lg flex items-center"
          onClick={() => setOpen(true)}
        >
          <span className="text-lg">💬 Chat</span>
        </div>
      ) : (
        <div className="w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-4 flex justify-between items-center font-semibold">
            <span>Chatbot</span>
            <button
              className="bg-transparent border-none text-white text-xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="flex-1 px-4 py-4 overflow-y-auto bg-gray-50">
            {/* Chat messages will go here */}
            <div className="mb-3 px-4 py-2 rounded-xl max-w-[80%] text-sm bg-blue-100 text-gray-800 self-start">
              Hi! How can I help you?
            </div>
          </div>
          <div className="flex px-4 py-3 bg-gray-50 border-t border-blue-100">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
