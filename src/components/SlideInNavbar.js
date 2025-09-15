import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SlideInNavbar.css';

const SlideInNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(prev => !prev);
  };

  // Prevent body scrolling when nav is open (avoid layout shift)
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  const handleExit = () => {
    console.log("User logged out");
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className="navbar-toggle"
        onClick={toggleNavbar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="navbar-name">Agro.ai</span>
      </button>

      {/* Overlay behind the navbar; clicking it closes the nav */}
      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={toggleNavbar} />

      {/* The slide-in nav */}
      <nav className={`slide-in-navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/home" onClick={toggleNavbar}>Home</Link></li>
          <li><Link to="/profile" onClick={toggleNavbar}>Profile</Link></li>
          <li><Link to="/control" onClick={toggleNavbar}>Controls</Link></li>
          <li><Link to="/plantsearch" onClick={toggleNavbar}>Explore</Link></li>
          <li><Link to='/chat' onClick={toggleNavbar}>Community</Link></li>
          <li><Link to='/chatbot' onClick={toggleNavbar}>Chat Bot</Link></li>
          <li><Link to="/schedule" onClick={toggleNavbar}>Schedule</Link></li>
          <li><button className="exit-button" onClick={handleExit}>Exit</button></li>
        </ul>
      </nav>
    </>
  );
};

export default SlideInNavbar;
