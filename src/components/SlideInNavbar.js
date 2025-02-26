import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SlideInNavbar.css'; // Import the CSS for styling

const SlideInNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleExit = () => {
    // Logic to handle exit (e.g., clear user session)
    console.log("User logged out");
    navigate('/login'); // Redirect to the Login page
  };

  return (
    <div>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="navbar-name">Agro.ai</span> {/* Adding name next to the hamburger */}
      </button>
      <nav className={`slide-in-navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <br />
            <br />
            <Link to="/home" onClick={toggleNavbar}>Home</Link>
          </li>
          <li>
            <Link to="/profile" onClick={toggleNavbar}>Profile</Link>
          </li>
          <li>
            <Link to="/control" onClick={toggleNavbar}>Controls</Link>
          </li>
          <li>
            <Link to="/plantsearch" onClick={toggleNavbar}>Explore</Link>
          </li>
          <li>
            <Link to='/chat' onClick={toggleNavbar}>Community</Link>
          </li>
          <li>
            <Link to='/chatbot' onClick={toggleNavbar}>Chat Bot</Link>
          </li>
          <li>
            <Link to="/schedule" onClick={toggleNavbar}>Schedule</Link>
          </li>
          <li>
            <Link to="/login" onClick={toggleNavbar}>Exit</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SlideInNavbar;
