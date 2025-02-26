import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Chat.css';
import SlideInNavbar from './SlideInNavbar';
import { databases } from '../appwriteConfig';
import { Permission, Role, ID } from 'appwrite';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const username = localStorage.getItem('userName') || 'Anonymous';

  // Fetch messages from Appwrite when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await databases.listDocuments(
          '67bea376001fcea919ba',  // Your database ID
          '67bea385003143b327ec'   // Your collection ID
        );
        setMessages(response.documents);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  // Listen for real-time updates on the messages
  useEffect(() => {
    const subscribeToMessages = () => {
      const realtime = new Realtime();  // Ensure you've initialized Realtime correctly
      realtime.subscribe('collections.67bea385003143b327ec.documents', (data) => {
        if (data && data.events.includes('databases.documents.create')) {
          setMessages((prevMessages) => [...prevMessages, data.payload]);
        }
      });
    };

    subscribeToMessages();

    return () => {
      // Cleanup the subscription when the component unmounts
      realtime.unsubscribe();
    };
  }, []);

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
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
          autoComplete="off"
          onKeyDown={handleSendMessage}
          placeholder="Type your message and press Enter..."
        />
      </form>

      <button className="clear-button" onClick={handleClearChat}>Clear Chat</button>
    </div>
  );
};

export default Chat;
