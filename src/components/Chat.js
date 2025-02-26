import React, { useState, useEffect } from 'react';
import './Chat.css';
import SlideInNavbar from './SlideInNavbar';
import { Client, Databases, ID, Permission, Role } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')  // Your Appwrite endpoint
  .setProject('67bea2dc001e1c340258');  // Your Appwrite project ID

const databases = new Databases(client);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const username = localStorage.getItem('userName') || 'Anonymous';

  // Polling interval in milliseconds (e.g., 5 seconds)
  const pollingInterval = 5000;

  // Fetch messages from the new database and collection
  const fetchMessages = async () => {
    try {
      const response = await databases.listDocuments(
        '67bea376001fcea919ba',  // Database ID
        '67beb6ba00244e799fa2'   // New Collection ID
      );
      setMessages(response.documents);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Set up polling to fetch messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, pollingInterval);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Send a new message to the new collection
  const handleSendMessage = async (e) => {
    if (input.trim()) {
      e.preventDefault();

      try {
        const timestamp = new Date().toISOString();

        await databases.createDocument(
          '67bea376001fcea919ba',  // Database ID
          '67beb6ba00244e799fa2',  // New Collection ID
          ID.unique(),
          { text: input, sender: username, timestamp },
          [
            Permission.read(Role.any()), 
            Permission.write(Role.any())
          ]
        );

        // After sending, re-fetch messages to update the UI
        fetchMessages();
        setInput('');  // Reset input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Clear chat history
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

      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
          autoComplete="off"
          placeholder="Type your message and press Enter..."
        />
      </form>

      <button className="clear-button" onClick={handleClearChat}>Clear Chat</button>
    </div>
  );
};

export default Chat;
