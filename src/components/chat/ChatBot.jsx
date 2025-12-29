import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! Welcome to Learnify. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: 'I have a question about my courses',
      sender: 'user',
      timestamp: new Date()
    },
    {
      id: 3,
      text: 'I\'d be happy to help! What would you like to know about your courses?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (message) => {
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={toggleChat}
            />
            
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-xl flex flex-col"
              style={{ maxWidth: '100%', zIndex: 45 }}
            >
              <ChatHeader onClose={toggleChat} />
              <ChatMessages messages={messages} />
              <ChatInput onSendMessage={handleSendMessage} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
