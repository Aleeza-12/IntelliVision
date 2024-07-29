import React from 'react';
import './Navbar.css';

const Navbar = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={'/images/SAlogo.jpg'} alt="Logo" className="logo" />
        <div className="navbar-brand">Dashboard</div>
      </div>
      <div className="navbar-right">
        <button className="nav-button" onClick={onLoginClick}>Login</button>
        <button className="nav-button" onClick={onSignupClick}>Signup</button>
        <div className="profile">
          <img src={'/images/SAlogo.jpg'} alt="Profile" className="icon" />
          <span>Amanda Smith</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
