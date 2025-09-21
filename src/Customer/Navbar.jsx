import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't render navbar on login pages
  if (location.pathname === '/login' || location.pathname === '/admin-login') {
    return null;
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const logoAnimation = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setUserMenuOpen(false);
    navigate('/');
  };

  const handleBookAppointment = () => {
    navigate('/slot-booking');
  };

  return (
    <motion.nav 
      className="navbar"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="nav-container">
        {/* Logo with animation */}
        <motion.div 
          className="logo-wrapper"
          variants={logoAnimation}
        >
          <img 
            src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP' 
            alt="Salon Logo"
            className="navbar-logo me-3"
          />
          <motion.span 
            className="logostext"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Timeless<br/> Trendz
          </motion.span>
        </motion.div>

        <motion.ul 
          className="nav-menu"
          variants={container}
        >
          {[
            { path: "/", name: "Home" },
          ].map((link, index) => (
            <motion.li 
              key={link.path}
              className="nav-item"
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                to={link.path} 
                className="nav-link" 
                activeclassname="active"
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}

          {/* Services Dropdown */}
          <motion.li 
            className="nav-item dropdown"
            variants={item}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className="nav-link dropdown-toggle">
              Services <i className={`fas fa-chevron-${servicesOpen ? 'up' : 'down'}`}></i>
            </div>
            
            <motion.ul 
              className="dropdown-menu"
              initial="closed"
              animate={servicesOpen ? "open" : "closed"}
              variants={dropdownVariants}
            >
              <li>
                <NavLink 
                  to="/services" 
                  className="dropdown-item"
                  activeclassname="active"
                >
                  <i className="fas fa-cut"></i> Hair Services
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/skin" 
                  className="dropdown-item"
                  activeclassname="active"
                >
                  <i className="fas fa-spa"></i> Skin Services
                </NavLink>
              </li>
             
              {user && user.role === 'staff' && (
                <li>
                  <NavLink 
                    to="/appointments" 
                    className="dropdown-item"
                    activeclassname="active"
                  >
                    <i className="fas fa-calendar-alt"></i> Staff Portal
                  </NavLink>
                </li>
              )}
            </motion.ul>
          </motion.li>

          {[
            { path: "/aboutus", name: "AboutUs" },
            { path: "/offers", name: "Offers" },
            { path: "/contactus", name: "Contactus" },
           
          ].map((link, index) => (
            <motion.li 
              key={link.path}
              className="nav-item"
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                to={link.path} 
                className="nav-link" 
                activeclassname="active"
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}

          {/* User Menu or Logout Button */}
          {user ? (
            <motion.li 
              className="nav-item user-menu"
              variants={item}
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
            >
              <div className="user-welcome" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                <i className="fas fa-user-circle" style={{ fontSize: "22px", color: "#8083e4ff" }}></i>
                <span style={{ fontWeight: "500", color: "#1a1a1aff" }}>{user.name}</span>
                <i className={`fas fa-chevron-${userMenuOpen ? "up" : "down"}`} style={{ color: "#666" }}></i>
              </div>
              
              <motion.ul 
                className="user-dropdown-menu"
                initial="closed"
                animate={userMenuOpen ? "open" : "closed"}
                variants={dropdownVariants}
              >
                <li>
                  <button 
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </motion.ul>
            </motion.li>
          ) : (
            // Simple logout button for non-logged in users (if needed)
            <motion.li 
              className="nav-item"
              variants={buttonAnimation}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.button 
                className="logout-button"
                onClick={() => navigate('/')}
                variants={buttonAnimation}
              >
                <i className="fas fa-home"></i> Home
              </motion.button>
            </motion.li>
          )}

          <motion.li 
            className="nav-item book-appointment-btn"
            variants={buttonAnimation}
            whileHover="hover"
            whileTap="tap"
          >
            <motion.button 
              className="appointment-button"
              onClick={handleBookAppointment}
              variants={buttonAnimation}
            >
              <i className="fas fa-calendar-plus"></i> Book Appointment
            </motion.button>
          </motion.li>
        </motion.ul>
      </div>
    </motion.nav>
  );
}

export default Navbar;