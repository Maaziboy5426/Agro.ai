import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Chat.css'; // Import CSS for styling
import SlideInNavbar from './SlideInNavbar';
import { Permission, Role, ID } from 'appwrite';
import { databases } from '../appwriteConfig'; // Import your Appwrite configuration

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  
  const username = localStorage.getItem('userName') || 'Anonymous';

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (e) => {
    if (input.trim()) {
      e.preventDefault();

      try {
        const timestamp = new Date().toISOString();

        await databases.createDocument(
          '67bea376001fcea919ba', 
          '67bea385003143b327ec', 
          ID.unique(),
          { text: input, sender: username, timestamp },
          [
            Permission.read(Role.any()), 
            Permission.write(Role.any())
          ]
        );

        setMessages([...messages, { text: input, sender: username, timestamp }]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
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
      <p>Logged in as: <strong>{username}</strong></p>
      
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
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck="false"
            autoComplete="off"
            onKeyDown={handleSendMessage}
            placeholder="Type your message and press Enter..."
          />
          <button
            type="button"
            className="send-button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </form>

      <button className="clear-button" onClick={handleClearChat}>Clear Chat</button>
    </div>
  );
};

export default Chat;
