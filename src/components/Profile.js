import { useState, useEffect, useRef } from "react";
import "./Profile.css";
import SlideInNavbar from "./SlideInNavbar";

const Profile = () => {
  // Load user profile data from localStorage, including name
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe", // Default name if not set
    email: "john.doe@example.com", // Default email if not set
    bio: "A passionate plant lover and gardening enthusiast.", // Default bio if not set
    profilePicture: "pfp.jpg", // Default profile picture if not uploaded
  };

  const [user, setUser] = useState(storedUser);
  const fileInputRef = useRef(null); // Ref to trigger file input

  // Update localStorage whenever user data changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

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
            alt="Profile"
            className="profile-picture clickable"
            onClick={handleImageClick}
            title="Click to change profile picture"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <h2>{user.name}</h2> {/* Display name from localStorage */}
          <div className="profile-info">
            <div className="profile-field">
  {/*             <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={user.name}
                readOnly
                className="profile-input"
              /> */}
            </div>
            <div className="profile-field">
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="profile-input"
              />
            </div>
            <div className="profile-field">
              <strong>Bio:</strong>
              <textarea
                name="bio"
                value={user.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
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
