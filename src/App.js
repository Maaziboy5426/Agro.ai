// src/App.js
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../src/components/Home';
import Login from '../src/components/Login';
import SignUp from '../src/components/SignUp';
import Profile from '../src/components/Profile'; // Import the Profile component
import SlideInNavbar from '../src/components/SlideInNavbar'; // Import the SlideInNavbar
import PlantSearch from '../src/components/PlantSearch';
import Data from '../src/components/Data';
import Chat from './components/Chat';
import Control from './components/Control'; // Import the Control component
import Chatbot from './components/Chatbot';
import Schedule from './components/Schedule';


function App() {
  const [users, setUsers] = useState([]); // State to store registered users
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  // Load users from local storage when the app mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  // Register a new user and save to local storage
  const registerUser = (username, password) => {
    const newUser = { username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save to local storage
  };

  // Function to handle login (for demonstration purposes)
  const handleLogin = () => {
    setIsAuthenticated(true); // Set authenticated state to true
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login users={users} onLogin={handleLogin} />} />
        <Route path="/home" element={<><SlideInNavbar /><Home /></>} />
        <Route path="/login" element={<Login users={users} onLogin={handleLogin} />} />
        <Route path="/sign-up" element={<SignUp registerUser={registerUser} />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/plantSearch" element={<PlantSearch />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Control" element={<Control />} />
        <Route path='/Chatbot' element={<Chatbot />}/>
        <Route path='/Schedule' element={<Schedule />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
