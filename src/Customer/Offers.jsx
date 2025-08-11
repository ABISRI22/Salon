import React from 'react';
import { motion } from 'framer-motion';
import './Offers.css';

function Offers() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardHover = {
    scale: 1.03,
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  };

  const buttonHover = {
    scale: 1.05,
    backgroundColor: "#d4a762",
    color: "#fff",
    transition: {
      duration: 0.3
    }
  };

  const buttonTap = {
    scale: 0.95
  };

  return (
    <div className="offers-page">
      {/* Hero Section */}
     
       <motion.section 
  className="offer-hero"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <div className="hero-image-container">
    <motion.img 
      src="https://thumbs.dreamstime.com/b/modern-interior-beauty-salon-purple-colors-high-quality-photo-291197475.jpg" 
      alt="Salon offers"
      className="hero-image"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <div className="hero-overlay">
      <div className="hero-text-container">
        <motion.h1 
          className="hero-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          EXCLUSIVE OFFERS & PREMIUM PACKAGES
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover our limited-time specials and elevate your beauty experience
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
        >
          <motion.button 
            className="cta-button"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Book Now & Save 20%
          </motion.button>
        </motion.div>
      </div>
    </div>
  </div>
</motion.section>

      {/* Offers Grid */}
      <motion.section 
        className="offers-grid-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <h2 className="section-title">Current Promotions</h2>
        <p className="section-subtitle">Limited time offers - don't miss out!</p>
        
        <div className="offers-grid">
          <motion.div 
            className="offer-card" 
            variants={fadeIn}
            whileHover={cardHover}
          >
            <div className="offer-badge">20% OFF</div>
            <motion.div 
              className="offer-image-container"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://www.mrsfields.com/cdn/shop/articles/shutterstock_2408066691_1.jpg?v=1725556532" 
                alt="Birthday Discount"
                className="offer-image"
              />
            </motion.div>
            <div className="offer-content">
              <h2>Birthday Special</h2>
              <p>Celebrate your special day with us! Enjoy a flat 20% discount on your entire bill during your birthday month.</p>
              <motion.button 
                className="offer-button"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Claim Offer
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="offer-card" 
            variants={fadeIn}
            whileHover={cardHover}
          >
            <div className="offer-badge">30% OFF</div>
            <motion.div 
              className="offer-image-container"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://www.iecaonline.com/wp-content/uploads/2022/10/02-College-List-istockphoto-1340766096-1024x1024-1.jpg" 
                alt="Student Discount"
                className="offer-image"
              />
            </motion.div>
            <div className="offer-content">
              <h2>Student Discount</h2>
              <p>Fresh cut, fresh look! Show your college ID and get 30% off all services. Perfect for student budgets.</p>
              <motion.button 
                className="offer-button"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Claim Offer
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="offer-card" 
            variants={fadeIn}
            whileHover={cardHover}
          >
            <div className="offer-badge">25% OFF</div>
            <motion.div 
              className="offer-image-container"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://thumbs.dreamstime.com/b/business-meeting-office-life-4137752.jpg" 
                alt="New Client Offer"
                className="offer-image"
              />
            </motion.div>
            <div className="offer-content">
              <h2>New Client Welcome</h2>
              <p>First-time visitors get 25% off! We know trying a new salon takes trust, so we're making it rewarding.</p>
              <motion.button 
                className="offer-button"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                Claim Offer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Membership Section */}
      <motion.section 
        className="membership-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="section-header">
          <h2 className="section-title">Premium Membership</h2>
          <p className="section-subtitle">Unlock exclusive benefits and savings</p>
        </div>
        
        <motion.div 
          className="membership-card"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
        >
          <div className="membership-badge">VIP</div>
          <div className="membership-content">
            <h2>Elite Beauty Club</h2>
            <div className="membership-features">
              <motion.div 
                className="feature-item"
                whileHover={{ x: 5 }}
              >
                <span>✓</span> Up to 50% off all services
              </motion.div>
              <motion.div 
                className="feature-item"
                whileHover={{ x: 5 }}
              >
                <span>✓</span> Exclusive member-only specials
              </motion.div>
              <motion.div 
                className="feature-item"
                whileHover={{ x: 5 }}
              >
                <span>✓</span> Priority booking & time slots
              </motion.div>
              <motion.div 
                className="feature-item"
                whileHover={{ x: 5 }}
              >
                <span>✓</span> Free monthly luxury treatment
              </motion.div>
              <motion.div 
                className="feature-item"
                whileHover={{ x: 5 }}
              >
                <span>✓</span> Complimentary premium products
              </motion.div>
            </div>
            <motion.button 
              className="membership-button"
              whileHover={{
                backgroundColor: "#000",
                color: "#fff",
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Club - 5000/year
            </motion.button>
          </div>
          <motion.div 
            className="membership-image-container"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
              alt="Membership Benefits"
              className="membership-image"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Limited Time Offer */}
      <motion.section 
        className="limited-offer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="limited-offer-content">
          <motion.div 
            className="offer-tag"
            animate={{
              rotate: [0, 5, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            FLASH SALE!
          </motion.div>
          <h2>Summer Glow Package</h2>
          <p className="price">
            <span className="original-price">6000</span>
            <span className="discounted-price">4000</span>
          </p>
          <p>Haircut + Color + Facial + Manicure</p>
          <motion.button
            className="limited-offer-button"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#ff6b6b"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now - Limited Time!
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}

export default Offers;