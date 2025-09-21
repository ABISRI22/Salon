import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Skin.css';

function Skin() {
  const navigate = useNavigate();
  
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
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Function to handle booking
   const handleBookNow = () => {
    navigate('/slot-booking');
  };

  return (
    <motion.div 
      className="skin-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="skin-header" variants={itemVariants}>
        <motion.h1 
          className="playfair-display"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skin Treatments
        </motion.h1>
        <motion.div 
          className="header-underline"
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>
      </motion.div>

      <motion.p 
        className="dancing-script" 
        style={{ color: 'black' }}
        variants={itemVariants}
      >
        Timeless Trendz specializes in a variety of skin treatments to help you look and feel your best. Our services include manicures, pedicures, detanning, glass treatment, Acne Treatment and waxing. Trust our experts to provide you with the highest quality care and leave feeling refreshed and rejuvenated.
        <br /><br />
        Skin treatments are designed to get rid of any of the common skin problems that you may be facing. As there are many different types of skin problems that people normally suffer from, there are a variety of treatment types and products that you can choose from.We're here to bring out your natural beauty, giving your skin the care it deserves. Each visit is like a little adventure towards feeling and looking fantastic. Come join us on the journey to radiant, flawless skin!
      </motion.p>

      <motion.div className="treatments-grid">
        {/* First Row */}
        <motion.div 
          className="treatment-card"
          variants={{
            ...itemVariants,
            hover: cardVariants.hover
          }}
          whileHover="hover"
        >
          <div className="card-image-container">
            <motion.img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqewKqnqE9u0dpsw2R-bIgW5GuKXLZOPr1-PyJBC4nGejj3TC0PoFeKL_Mb7hY0kBSlGg&usqp=CAU" 
              alt='manicure'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <h3>Manicure</h3>
          <p className="duru-sans-regular">Elevate your everyday with our luxurious manicures – where beauty meets precision, one perfectly polished nail at a time!</p>
          <motion.button 
            className="book-now-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#d4a373" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookNow('Manicure')}
          >
            Book Now
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="treatment-card"
          variants={{
            ...itemVariants,
            hover: cardVariants.hover
          }}
          whileHover="hover"
        > 
          <div className="card-image-container">
            <motion.img 
              src="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-545984710-612x612-1.jpg" 
              alt='pedicure'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <h3>Pedicure</h3>
          <p className="duru-sans-regular">Highlight the benefits of pampering your feet, emphasizing relaxation, improved appearance, and overall well-being.</p>
          <motion.button 
            className="book-now-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#d4a373" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookNow('Pedicure')}
          >
            Book Now
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="treatment-card"
          variants={{
            ...itemVariants,
            hover: cardVariants.hover
          }}
          whileHover="hover"
        > 
          <div className="card-image-container">
            <motion.img 
              src="https://yesmadam.com/blog/wp-content/uploads/2021/07/WhatsApp-Image-2021-07-08-at-8.43.11-AM-1.jpeg" 
              alt='detanning'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <h3>Detanning</h3>
          <p className="duru-sans-regular">Reveal your skin's natural radiance with our advanced detanning solutions. Experience a brighter, more even complexion and say goodbye to sun damage.</p>
          <motion.button 
            className="book-now-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#d4a373" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookNow('Detanning')}
          >
            Book Now
          </motion.button>
        </motion.div>

        {/* Second Row */}
        <motion.div 
          className="treatment-card"
          variants={{
            ...itemVariants,
            hover: cardVariants.hover
          }}
          whileHover="hover"
        >
          <div className="card-image-container">
            <motion.img 
              src="https://www.fashionweekly.com.au/images/Blog_2024/Beauty/How-to-Get-Glass-Skin-K-Beauty-Tips-According-to-Experts-2024.jpg" 
              alt='glass treatment'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <h3>Glass Treatment</h3>
          <p className="duru-sans-regular">See the world in a whole new light! Our glass treatment eliminates glare and distortion, revealing a pristine, crystal-clear view</p>
          <motion.button 
            className="book-now-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#d4a373" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookNow('Glass Treatment')}
          >
            Book Now
          </motion.button>
        </motion.div>

        <motion.div 
          className="treatment-card"
          variants={{
            ...itemVariants,
            hover: cardVariants.hover
          }}
          whileHover="hover"
        >
          <div className="card-image-container">
            <motion.img 
              src="https://allure-derm.com/storage/2024/04/Acne-Treatment-by-Allure-Dermatology-in-Edinburg-TX.webp" 
              alt='acne treatment'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <h3>Acne Treatment</h3>
          <p className="duru-sans-regular">Struggling with acne? Our personalized treatment plans address the root causes of breakouts, helping you achieve lasting clear skin and prevent future flare-ups.</p>
          <motion.button 
            className="book-now-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#d4a373" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookNow('Acne Treatment')}
          >
            Book Now
          </motion.button>
        </motion.div>

        <motion.div 
          className="treatment-card"
          variants={{
            ...itemVariants,
            hover: cardVariants.hover
          }}
          whileHover="hover"
        >
          <div className="card-image-container">
            <motion.img 
              src="https://naomisheadmasters.com/wp-content/uploads/2023/06/Full-Body-Waxing-Prices-In-Chandigarh.webp" 
              alt='waxing'
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <h3>Waxing</h3>
          <p className="duru-sans-regular">Reveal your skin's natural beauty with our expert waxing.Experience the luxury of smooth, hair-free skin.</p>
          <motion.button 
            className="book-now-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#d4a373" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBookNow('Waxing')}
          >
            Book Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Skin;