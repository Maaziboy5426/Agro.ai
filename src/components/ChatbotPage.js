import React from "react";
import Chatbot from "./Chatbot"; // Import Chatbot Component
import "./ChatbotPage.css"; // Import CSS
import { Link } from "react-router-dom";

const ChatbotPage = () => {
  return (
    <div className="chatbot-page">
      <header>
        <h2>Farming Chatbot</h2>
        <Link to="/" className="close-btn">✖</Link>
      </header>
      <Chatbot isOpen={true} />
    </div>
  );
};

export default ChatbotPage;