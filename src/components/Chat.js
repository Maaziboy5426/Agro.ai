// src/components/Chat.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Chat.css';
import SlideInNavbar from './SlideInNavbar';
import { Client, Databases, ID, Permission, Role } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67bea2dc001e1c340258');

const databases = new Databases(client);

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
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
  
      try {
        const timestamp = new Date().toISOString(); // Get the current timestamp in ISO 8601 format
  
        // Create a new message in the collection
        await databases.createDocument(
          '67bea376001fcea919ba', // Database ID
          '67bea385003143b327ec', // Collection ID
          ID.unique(), // Unique document ID
          { text: input, sender: username, timestamp }, // Message data
          [
            Permission.read(Role.any()), // Anyone can read the message
            Permission.write(Role.any()) // Anyone can write the message
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

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.67bea376001fcea919ba.collections.67bea385003143b327ec.documents`,
      (response) => {
        if (response.events.includes('databases.*.collections.*.documents.create')) {
          setMessages((prev) => [...prev, response.payload]);
        }
      }
    );

    return () => unsubscribe();
  }, []);

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
