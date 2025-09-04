import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';
import Partners from './Partners';

function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.footer 
      className="footer-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-col footer-brand"
            variants={itemVariants}
          >
            <div className="logo-container">
              <img 
                src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP' 
                alt="Salon Logo"
                className="footer-logo"
              />
              <span className="logo-text">Timeless Trendz</span>
            </div>
            <p className="footer-about">
              Your complete salon solution. 
              <br/>Bookings, staff, and growth simplified.
            </p>
            <div className="social-icons">
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                aria-label="Facebook"
              >
                <FaFacebook className="social-icon facebook" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                aria-label="Twitter"
              >
                <FaTwitter className="social-icon twitter" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                aria-label="Instagram"
              >
                <FaInstagram className="social-icon instagram" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                aria-label="Pinterest"
              >
                <FaPinterest className="social-icon pinterest" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="footer-col"
            variants={itemVariants}
          >
            <h5 className="footer-heading">About Product</h5>
            <ul className="footer-links">
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/">Home</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/aboutus">About Us</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/offers">Offers</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/Partners">Partners</Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div 
            className="footer-col"
            variants={itemVariants}
          >
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/Partners">Partners</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/contactus">Contact Us</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/salon-trendy">Salon Trendy</Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link to="/la-salon">La salon</Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="copyright"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Timeless Trendz. All rights reserved.</p>
          <p>Timeless Trendz is an independent platform for salon and spa management.</p>
          <p>Unauthorized use, reproduction, or distribution of any part of this website or its content is strictly prohibited.</p>
          <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;