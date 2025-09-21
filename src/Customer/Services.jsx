import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Services.css';

function Services() {
  const navigate = useNavigate();
  
  // Animation variants
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

  const item = {
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

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const services = [
    {
      title: "Men's Haircut",
      image: "https://www.skinnyscoop.com/wp-content/uploads/2021/12/Short-hair-style-Cowlick-19B.jpg",
      description: "A good haircut can complement a man's face shape and features, drawing attention to the positive aspects.",
    },
    {
      title: "Women's Haircut",
      image: "https://client-websites.blr1.digitaloceanspaces.com/peacocksalon/wp-content/uploads/2025/05/26234518/Hair-Cut-Style-for-Women-Long-Hair-3.jpg",
      description: "A fresh haircut can significantly impact a woman's confidence and self-esteem.",
    },
    {
      title: "Kera Smooth",
      image: "https://www.gkhair.ae/cdn/shop/articles/Which_Is_Better_For_Your_Hair_Smoothening_or_Keratin_Treatment.webp?v=1719330876",
      description: "Transform wavy, curly, or frizzy hair into straight, smooth, and shiny hair at Timeless Trendz",
    },
    {
      title: "Hair Wash & Conditioning",
      image: "https://www.incredibleman.in/wp-content/uploads/2022/07/Hair-Washing-Rules-from-The-Salon-Experts.jpg",
      description: "Indulge your hair with a rejuvenating hair wash and conditioning treatment, leaving it refreshed and hydrated.",
    },
    {
      title: "AntiDandruff",
      image: "https://m.media-amazon.com/images/I/719bMpI3fVL._UF350,350_QL80_.jpg",
      description: "Frizz can be a sign of dry, damaged hair, which is more prone to breakage and split ends.",
    },
    {
      title: "Hair Coloring",
      image: "https://i.pinimg.com/736x/df/ac/53/dfac532cd4bc158ca2411a2b0cdd7d1a.jpg",
      description: "Hair coloring can add depth, dimension, and shine to hair, making it look more vibrant and healthy.",
    },
    {
      title: "Fringe Haircut",
      image: "https://haircutinspiration.com/wp-content/uploads/fringe-1-1.jpg",
      description: "Step up your style game with a fringe haircut featuring two perfectly defined lines.",
    },
    {
      title: "Trimming",
      image: "https://www.jiomart.com/images/product/original/rvdcf3nuom/appslite-hair-trimmer-for-men-buddha-style-trimmer-professional-hair-clipper-adjustable-blade-clipper-hair-trimmer-and-shaver-for-men-retro-oil-head-close-cut-precise-hair-trimming-machine-product-images-orvdcf3nuom-p602014487-0-202305310638.jpg?im=Resize=(1000,1000)",
      description: "As long as you're happy with how your hair looks, you shouldn't worry about getting it trimmed that often.",
    },
     {
      title: "Beard Sculpt",
      image: "https://igimage.indiaglitz.com/tamil/news/thalapathy68diwali272023mt-f66.jpg",
      description: "A beard isn't just facial hair. It's style, attitude, and confidence. Let our salon bring out the best version of yours.",
    }
  ];

  // Function to handle booking navigation
  const handleBookNow = () => {
    navigate('/slot-booking');
  };

  return (
    <motion.div 
      className="services-container"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        variants={fadeIn}
      >
        <motion.h1 
          className="section-title poppins-black"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          HairCut & Styling
        </motion.h1>
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img 
            src="https://lh3.googleusercontent.com/LKhhYgHiT-AicXS4fwOaKv9phpt023vVPMQxOlhdT8m4VeP9QoKdtsYMOh51raz9sltFXDG1oAIgOdqmAKiDnAHW1aWngGq72OOeUv9N=h450-rw" 
            alt="haircut" 
          />
        </motion.div>
        <motion.h2 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          "Stylish cuts, glowing skin, and total beauty care"
        </motion.h2>
        <motion.p 
          className="section-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          At Timeless Trendz, transform your look with expert haircuts, vibrant coloring, rejuvenating facials, and relaxing spa treatments—all tailored to enhance your natural beauty. From precision haircuts and trendy styles to vibrant coloring and nourishing hair treatments, we've got your hair goals covered.
        </motion.p>
      </motion.div>

      {/* Services Grid */}
      <motion.div 
        className="services-grid"
        variants={container}
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="service-card"
            variants={item}
            whileHover={{ y: -10 }}
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-footer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookNow}
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Services;