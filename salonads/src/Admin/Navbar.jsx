// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onLogout, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <h2>Admin Dashboard</h2>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          <li>
            <button 
              className={activeTab === "customer" ? "active" : ""} 
              onClick={() => handleTabChange("customer")}
            >
              Customer
            </button>
          </li>
          <li>
            <button 
              className={activeTab === "staff" ? "active" : ""} 
              onClick={() => handleTabChange("staff")}
            >
              Staff
            </button>
          </li>
          <li>
            <button 
              className={activeTab === "schedule" ? "active" : ""} 
              onClick={() => handleTabChange("schedule")}
            >
              Schedule
            </button>
          </li>
        </ul>

        {/* User menu and logout */}
        <div className="navbar-user">
          <div className="user-info">
            <span>Admin User</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <button 
          className={activeTab === "customer" ? "active" : ""} 
          onClick={() => handleTabChange("customer")}
        >
          Customer
        </button>
        <button 
          className={activeTab === "staff" ? "active" : ""} 
          onClick={() => handleTabChange("staff")}
        >
          Staff
        </button>
        <button 
          className={activeTab === "schedule" ? "active" : ""} 
          onClick={() => handleTabChange("schedule")}
        >
          Schedule
        </button>
      </div>
    </nav>
  );
};

export default Navbar;