// src/components/Chat.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Chat.css'; // Import CSS for styling
import SlideInNavbar from './SlideInNavbar';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  // ✅ Automatically use the logged-in username
  const username = localStorage.getItem('userName') || 'Anonymous';

  // Load messages from local storage when the component mounts
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(savedMessages);
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      setMessages([...messages, { text: input, sender: username }]);
      setInput('');
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="chat-container">
      <SlideInNavbar />
      <h2>Community Chat</h2>
      <p>Logged in as: <strong>{username}</strong></p> {/* ✅ Show username, but not editable */}
      
      <div className="chat-box">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === username ? 'sent' : 'received'}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        ) : (
          <p>No messages yet. Start the conversation!</p>
        )}
      </div>

      <form className="chat-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
          autoComplete='off'
          onKeyDown={handleSendMessage}
          placeholder="Type your message and press Enter..."
        />
      </form>

      <button className="clear-button" onClick={handleClearChat}>Clear Chat</button>
    </div>
  );
};

export default Chat;
