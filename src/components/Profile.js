import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './Profile.css'; 
import SlideInNavbar from './SlideInNavbar';

const Profile = () => {
  const storedUserName = localStorage.getItem('userName') || 'John Doe';
  const fileInputRef = useRef(null); // Ref to trigger file input

  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem(`userProfile_${storedUserName}`));
    return savedUser || {
      name: storedUserName,
      email: 'john.doe@example.com',
      bio: 'A passionate plant lover and gardening enthusiast.',
      profilePicture:"pfp.jpg",
    };
  });

  useEffect(() => {
    localStorage.setItem(`userProfile_${storedUserName}`, JSON.stringify(user));
  }, [user, storedUserName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({ ...prevUser, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input when image is clicked
  };

  return (
    <>
      <SlideInNavbar />
      <div className="profile-container">
        <h1>User Profile</h1>
        <div className="profile-card">
          <img
            src={user.profilePicture}
            alt="pfp.jpg"
            className="profile-picture clickable"
            onClick={handleImageClick}
            title="Click to change profile picture"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
