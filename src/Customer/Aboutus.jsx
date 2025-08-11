import React from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';

// Enhanced animation configurations
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    } 
  }
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const imageHover = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Enhanced Hero Section with Parallax Effect */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="hero-image-wrapper"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <motion.img 
            src="https://mirrorandmanesalon.com/wp-content/uploads/2025/01/Mirror-Mane-website-5.jpg" 
            alt="Timeless Trendz Salon" 
            className="heros-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          />
          <motion.div 
            className="hero-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.8, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              Timeless Trendz
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 1, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              Where Beauty Meets Elegance
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Founder Section with Enhanced Animations */}
      <motion.section 
        className="founder-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
      >
        <motion.div className="section-header" variants={fadeIn}>
          <motion.h2 
            className="section-title"
            initial={{ letterSpacing: '10px' }}
            whileInView={{ letterSpacing: '2px' }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>
          <motion.div 
            className="title-divider"
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className="founder-content">
          <motion.div 
            className="founder-image" 
            variants={slideInLeft}
            whileHover="hover"
            initial={{ rotate: -2 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring" }}
          >
            <motion.img 
              src="https://instylhairnbridalstudio.com/wp-content/uploads/2024/03/PhotoGrid_1583749100442-1536x1536.jpg" 
              alt="Bindu Baskaran" 
              variants={imageHover}
            />
            <motion.div 
              className="experience-badge"
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.5, 
                type: "spring",
                stiffness: 150
              }}
              viewport={{ once: true }}
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <span>20+ Years</span>
              <span>Experience</span>
            </motion.div>
          </motion.div>

          <motion.div className="founder-details" variants={fadeIn}>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              About the Founder
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <strong>BINDU BASKARAN</strong> is the visionary behind <strong>TIMELESS TRENDZ</strong>, bringing <strong>two decades</strong> of unparalleled expertise in the beauty industry.
            </motion.p>
            
            <motion.div 
              className="stats-grid"
              variants={container}
            >
              <motion.div 
                className="stat-card"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="stat-number"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  50,000+
                </motion.div>
                <div className="stat-label">Haircuts</div>
              </motion.div>
              <motion.div 
                className="stat-card"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="stat-number"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  3,000+
                </motion.div>
                <div className="stat-label">Makeups</div>
              </motion.div>
              <motion.div 
                className="stat-card"
                variants={fadeIn}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <motion.div 
                  className="stat-number"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  15
                </motion.div>
                <div className="stat-label">Years</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Stylists Section */}
      <section className="stylists-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="section-title"
            initial={{ letterSpacing: '10px' }}
            whileInView={{ letterSpacing: '2px' }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            Meet Our Master Stylists
          </motion.h2>
          <motion.div 
            className="title-divider"
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Stylist 1 with Enhanced Animations */}
        <motion.div 
          className="stylist-card"
          initial="hidden"
          whileInView="visible"
          variants={slideInLeft}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className="stylist-image"
            variants={imageHover}
          >
            <img 
              src="https://hakimaalimjaipur.com/wp-content/uploads/2025/04/1744969259779.jpg" 
              alt="Aalim Hakim" 
            />
            <motion.div 
              className="social-links"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.a 
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <i className="fab fa-instagram"></i>
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <i className="fab fa-facebook"></i>
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <i className="fab fa-twitter"></i>
              </motion.a>
            </motion.div>
          </motion.div>
          <div className="stylist-info">
            <h3>Aalim Hakim</h3>
            <p className="specialty">Celebrity Hairstylist</p>
            <p>With fingers that craft magic and scissors that sculpt perfection, Aalim Hakim has styled Bollywood's elite...</p>
            <motion.div 
              className="signature"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              "Hair is the crown you never take off"
            </motion.div>
          </div>
        </motion.div>

        {/* Stylist 2 with Enhanced Animations */}
        <motion.div 
          className="stylist-card reverse"
          initial="hidden"
          whileInView="visible"
          variants={slideInRight}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ y: -5 }}
        >
          <motion.div 
            className="stylist-image"
            variants={imageHover}
          >
            <img 
              src="https://magarticles.magzter.com/articles/107/285362/5b2237235eb28/Anchal-Morwani-God-Is-In-The-Detail.jpg" 
              alt="Anchal Morwani" 
            />
            <motion.div 
              className="social-links"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.a 
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <i className="fab fa-instagram"></i>
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <i className="fab fa-facebook"></i>
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring" }}
              >
                <i className="fab fa-twitter"></i>
              </motion.a>
            </motion.div>
          </motion.div>
          <div className="stylist-info">
            <h3>Anchal Morwani</h3>
            <p className="specialty">Hair Artistry Specialist</p>
            <p>From Vidal Sassoon trained expert to Bollywood's favorite, Anchal brings international techniques...</p>
            <motion.div 
              className="signature"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              "Your hair speaks before you do"
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutUs;