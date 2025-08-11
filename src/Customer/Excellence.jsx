import React from 'react';
import { motion } from 'framer-motion';
import './Excellence.css';

function Excellence() {
  const features = [
    {
      icon: '✂️',
      text: '"From precision cuts to head-turning color, our stylists create hair that speaks volumes!"',
      color: '#8b5cf6'
    },
    {
      icon: '✨',
      text: '"Glow from within with our luxury facials - where advanced skincare meets radiant results!"',
      color: '#ec4899'
    },
    {
      icon: '🌟',
      text: '"The ultimate glow-up package: Facial + Hair + Makeup = Your most stunning self!"',
      color: '#f59e0b'
    },
    {
      icon: '💍',
      text: '"Bridal beauty perfected: Flawless skin, dream hair & picture-perfect makeup for your big day!"',
      color: '#10b981'
    }
  ];

  return (
    <div className='excellence-container'>
      <div className='row align-items-center'>
        <motion.div 
          className='col-lg-5 image-container'
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <motion.img 
            src='https://i.pinimg.com/1200x/67/1c/da/671cdacde94a426a7781694cd2cebc50.jpg' 
            alt='Excellence' 
            className='img-fluid salon-image'
            whileHover={{ scale: 1.02 }}
          />
        </motion.div>

        <motion.div 
          className="col-lg-7 content-section"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="section-title"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Your All-in-One <span className="highlight">Salon Experience</span>
          </motion.h2>
          
          <motion.p 
            className="description"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <b>Timeless Trendz</b> is the ultimate destination for luxury and premium hair, skin, bridal and other services. Our unisex beauty salon is designed as an escape from the hustle and bustle of everyday life.
          </motion.p>

          <ul className="features-list">
            {features.map((feature, index) => (
              <motion.li 
                key={index}
                className="feature-item"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (index * 0.1), type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                <motion.span 
                  className="feature-icon"
                  style={{ backgroundColor: feature.color }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  {feature.icon}
                </motion.span>
                <span className="feature-text">{feature.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Excellence;