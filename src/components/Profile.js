// src/components/Profile.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Profile.css'; // Import the CSS file for styling

const Profile = () => {
  // Retrieve the logged-in username from localStorage
  const storedUserName = localStorage.getItem('userName') || 'John Doe';

  // Initialize user state
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem(`userProfile_${storedUserName}`));
    return savedUser || {
      name: storedUserName,
      email: 'john.doe@example.com',
      bio: 'A passionate plant lover and gardening enthusiast.',
      profilePicture: 'https://via.placeholder.com/150', // Placeholder image
    };
  });

  // Update localStorage whenever user state changes
  useEffect(() => {
    localStorage.setItem(`userProfile_${storedUserName}`, JSON.stringify(user));
  }, [user, storedUserName]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
        <h2>{user.name}</h2>
        <div className="profile-info">
          <div className="profile-field">
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="profile-input"
            />
          </div>
          <div className="profile-field">
            <strong>Bio:</strong>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="profile-input"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="profile-field">
            <strong>Profile Picture:</strong>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="profile-input"
            />
          </div>
        </div>
      </div>
      <p className="return-link">
        <Link to="/home">Return</Link>
      </p>
    </div>
  );
};

export default Profile;
