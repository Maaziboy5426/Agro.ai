// src/components/SignUp.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Signup.css';

const SignUp = ({ registerUser  }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      registerUser (username, password); // Register the user
      navigate('/login'); // Redirect to Login page
    }
  };
  return (
    <div className="sign-up-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="sign-up-form">
            <div className="form-group">
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="sign-up-button">Sign Up</button>
            {error && <p className="error-message">{error}</p>}
        </form>
        <p>
            Already have an account? <Link to="/login">Login</Link>
        </p>
    </div>
);
}

export default SignUp;