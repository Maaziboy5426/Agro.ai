// src/components/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Login.css'; // Import CSS for styling

const Login = ({ users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('userName', user.username); // ✅ Store the username
      localStorage.setItem('userProfile', JSON.stringify(user)); // Store user profile
      navigate('/home'); // Redirect after login
    } else {
      setError('Invalid username or password');
    }
  };
  

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;