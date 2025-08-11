import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero() {
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

  return (
    <motion.section 
      className="hero-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-content">
        <motion.h1 className="hero-title" variants={itemVariants}>
          Timeless Trendz<br/>
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
          >
            Get Started
          </motion.button>
          
          <motion.div 
            className="demo-section"
            whileHover={{ scale: 1.02 }}
          >
            <p className="demo-text"><b>Book A Free Demo</b></p>
            <motion.img 
              src='https://5.imimg.com/data5/SELLER/Default/2022/7/OK/JI/FB/156189893/mobile-apps-development-services.jpeg' 
              alt="Mobile" 
              className="mobile-image"
              whileHover={{ rotate: 5 }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-image"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <img 
          src='https://i.pinimg.com/1200x/43/3f/e0/433fe0aeed10727c31d5847ac06cee51.jpg' 
          alt="Salon" 
          className="salon-pic" 
        />
      </motion.div>
    </motion.section>
  );
}

export default Hero;