import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Promo.css';

function Promo() {
  const navigate = useNavigate();
  
  const services = [
    { 
      id: 1, 
      src: "https://res.cloudinary.com/purnesh/image/upload/w_540,f_auto,q_auto:eco,c_limit/11612174807552.jpg", 
      alt: "Bridal Makeup",
      category: "MAKEUP",
      title: "Bridal Glamour"
    },
    { 
      id: 2, 
      src: "https://www.drdixitcosmeticdermatology.com/assets/service/image/4b4167ec36c402ca2180c081299a385c.webp", 
      alt: "Skin Treatment",
      category: "TREATMENTS",
      title: "Luxury Facials"
    },
    { 
      id: 3, 
      src: "https://www.ireform.in/wp-content/uploads/Korean-Glass-Skin-1024x1024.png", 
      alt: "Glass Skin",
      category: "TREATMENTS",
      title: "Korean Glass Skin"
    },
    { 
      id: 4, 
      src: "https://cdn1.npcdn.net/images/1747823378_38d45957ee3150a95ec82aa456719cd1.webp?md5id=426281d73409354c214025722c6160a8&new_width=1000&new_height=1000&size=max&type=3&w=1753339208&off_wm=1&from=png", 
      alt: "Hair Styling",
      category: "HAIRCUT",
      title: "Signature Blowout"
    },
    { 
      id: 5, 
      src: "https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/003/875/123/new_medium/Heena_Somani_%282%29.jpg", 
      alt: "Evening Makeup",
      category: "MAKEUP",
      title: "Evening Glam"
    },
    { 
      id: 6, 
      src: "https://i.pinimg.com/originals/4f/ed/ff/4fedff94cc2f8e18b4c337e44ebb2ae3.jpg", 
      alt: "Hair Color",
      category: "HAIRCUT",
      title: "Vibrant Coloring"
    },
    { 
      id: 7, 
      src: "https://i.pinimg.com/564x/c6/e3/bf/c6e3bf89b286d667e096f62c3da07632.jpg", 
      alt: "Skin Care",
      category: "TREATMENTS",
      title: "Acne Solutions"
    },
    { 
      id: 8, 
      src: "https://i.pinimg.com/474x/75/f6/81/75f68173cff03edb230f67ec101cc9ca.jpg", 
      alt: "Hair Treatment",
      category: "HAIRCUT",
      title: "Keratin Smoothing"
    }
  ];

  // Function to handle booking navigation
  const handleBookNow = () => {
    navigate('/slot-booking');
  };

  // Function to handle "View All Services" navigation
  const handleViewAllServices = () => {
    navigate('/services');
  };

  return (
    <div className="promo-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-header"
        >
          <motion.h1 
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="main-title"
          >
            Discover Our Artistry
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="sub-title"
          >
            HAIRCUTS • TREATMENTS • MAKEUP
          </motion.h2>
        </motion.div>

        <div className="gallery">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="gallery-item"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 80
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
            >
              <div className="image-container">
                <motion.img 
                  src={service.src} 
                  alt={service.alt}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="service-info"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="service-category">{service.category}</span>
                  <h3 className="service-title">{service.title}</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="book-now-btn"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="cta-container"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="main-cta"
            onClick={handleViewAllServices}
          >
            View All Services
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Promo;