import { useState, useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthContext"; // Import useAuth hook
import "./Profile.css";
import SlideInNavbar from "./SlideInNavbar";

const Profile = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const fileInputRef = useRef(null); // Ref to trigger file input
  const [profile, setProfile] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    bio: "A passionate plant lover and gardening enthusiast.",
    profilePicture: "https://tse4.mm.bing.net/th?id=OIP.Yaficbwe3N2MjD2Sg0J9OgHaHa&pid=Api&P=0&h=220",
  });

  useEffect(() => {
    if (user) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, profilePicture: reader.result }));
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
            src={profile.profilePicture}
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
          <h2>{profile.name}</h2> {/* Displays name from AuthContext */}
          <div className="profile-info">
            <div className="profile-field">
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={profile.email}
                readOnly
                className="profile-input"
              />
            </div>
            <div className="profile-field">
              <strong>Bio:</strong>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
