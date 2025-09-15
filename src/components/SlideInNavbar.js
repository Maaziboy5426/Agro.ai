import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SlideInNavbar.css';

const SlideInNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleExit = () => {
    console.log("User logged out");;
    navigate('/login'); // Redirect to login page
  };


  // Prevent background scroll when navbar is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay behind navbar */}
      <div 
        className={`overlay ${isOpen ? 'show' : ''}`} 
        onClick={toggleNavbar}
      ></div>

      {/* Toggle bar with hamburger + name */}
      <button className="navbar-toggle" onClick={toggleNavbar}>
        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="navbar-name">Agro.ai</span>
      </button>

      {/* Slide-in nav */}
      <nav className={`slide-in-navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/home" onClick={toggleNavbar}>Home</Link></li>
          <li><Link to="/profile" onClick={toggleNavbar}>Profile</Link></li>
          <li><Link to="/control" onClick={toggleNavbar}>Controls</Link></li>
          <li><Link to="/plantsearch" onClick={toggleNavbar}>Explore</Link></li>
          <li><Link to="/chat" onClick={toggleNavbar}>Community</Link></li>
          <li><Link to="/chatbot" onClick={toggleNavbar}>Chat Bot</Link></li>
          <li><Link to="/schedule" onClick={toggleNavbar}>Schedule</Link></li>
          <li><button className="exit-button" onClick={handleExit}>Exit</button></li>
        </ul>
      </nav>
    </>
  );
};

export default SlideInNavbar;
