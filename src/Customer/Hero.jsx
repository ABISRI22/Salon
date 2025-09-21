import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import { useNavigate } from 'react-router-dom';




function Hero() {
  // Animation variants
    const navigate = useNavigate();
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
   const handleBookNow = () => {
    navigate('/slot-booking');
  };
  

  return (
    <motion.section 
      className="hero-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background image with overlay */}
      <div className="hero-background">
        <img 
          src='https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80' 
          alt="Modern Salon" 
          className="background-image" 
        />
        <div className="overlay"></div>
      </div>
      
      <div className="hero-content">
        <motion.h1 className="hero-title" variants={itemVariants}>
          Timeless Trendz
          <motion.span 
            className="highlight-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Where Technology Meets Timeless Beauty
          </motion.span>
        </motion.h1>
        
        <motion.p className="hero-description" variants={itemVariants}>
          Timeless Trendz empowers salons and spas with smart, scalable software designed for the modern beauty industry. Our data-driven platform streamlines operations, boosts profitability, and enhances every client experience.
        </motion.p>
        
        <motion.div className="hero-actions" variants={itemVariants}>
          <motion.button 
            className="btn-get-started"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
             onClick={() => handleBookNow('Get Started')}

            
          >
            Get Started
          </motion.button>

         

          
          <motion.div 
            className="demo-section"
            whileHover={{ scale: 1.02 }}
          >
            <p className="demo-text"><b>Book A Free Demo</b></p>
            <motion.img 
              src='https://cdn-icons-png.flaticon.com/512/724/724664.png' 
              alt="Mobile" 
              className="mobile-image"
              whileHover={{ rotate: 5 }}
            />
          </motion.div>
        </motion.div>
        
        <motion.div className="hero-stats" variants={itemVariants}>
          <div className="stat-item">
            <span className="stat-value">500+</span>
            <span className="stat-label">Salons Empowered</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">98%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">40%</span>
            <span className="stat-label">Revenue Growth</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Hero;