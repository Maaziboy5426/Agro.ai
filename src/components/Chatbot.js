import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Chatbot.css';
import SlideInNavbar from "./SlideInNavbar";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "Hello! I'm your chatbot. How can I assist you today?", sender: "bot" }]);
  const [input, setInput] = useState("");

  const greetings = ["hello", "hi", "hey", "howdy"];
  const cropQuestions = [
    "what crops are best for this season",
    "how do i improve soil fertility",
    "any tips for pest control"
  ];
  const weatherQuestions = [
    "what's the weather forecast",
    "will it rain today",
    "is there a frost warning"
  ];
  const goodbyes = ["bye", "goodbye", "see you later", "take care"];

  const getResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (greetings.some((greet) => lowerInput.includes(greet))) {
      return greetings[Math.floor(Math.random() * greetings.length)].charAt(0).toUpperCase() + greetings[Math.floor(Math.random() * greetings.length)].slice(1);
    }

    if (cropQuestions.some((question) => lowerInput.includes(question))) {
      return "For this season, consider planting crops like maize, beans, and tomatoes. Remember to rotate crops to maintain soil health.";
    }

    if (weatherQuestions.some((question) => lowerInput.includes(question))) {
      return "You can check the weather forecast on your local weather website or app. It's crucial to stay updated for optimal conditions.";
    }

    if (goodbyes.some((bye) => lowerInput.includes(bye))) {
      return "Goodbye! See you next time.";
    }

    return "I'm sorry, I don't have information on that right now. Could you ask something else?";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    const botResponse = { text: getResponse(input), sender: "bot" };
    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  return (
    <div>
      <SlideInNavbar /> {/* Move SlideInNavbar outside of chat-container */}
      <div className="chat-container">
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>Chatbot</h2>
          <div style={{ height: "300px", overflowY: "auto", marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
                <span style={{ display: "inline-block", padding: "8px", borderRadius: "5px", background: msg.sender === "user" ? "#0084ff" : "#e0e0e0", color: msg.sender === "user" ? "white" : "black" }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            style={{ width: "75%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button onClick={handleSendMessage} style={{ padding: "10px", marginLeft: "5px", borderRadius: "5px", border: "none", background: "#0084ff", color: "white" }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;