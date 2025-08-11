import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaPhone, FaMapMarkerAlt, FaClock, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Contactus.css';

function Contactus() {
  const [result, setResult] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(null);

  const MAX_DAILY_SUBMISSIONS = 10; // Set your limit
  const COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minutes in milliseconds

  const testimonials = [
    {
      quote: "Best salon experience ever! The stylists are true artists who understood exactly what I wanted.",
      author: "Priya K.",
      rating: 5
    },
    {
      quote: "My hair has never looked better. The coloring was perfect and the staff made me feel so comfortable.",
      author: "Rahul M.",
      rating: 5
    },
    {
      quote: "Friendly staff and perfect results every time. I won't go anywhere else for my haircuts now!",
      author: "Ananya S.",
      rating: 4
    },
    {
      quote: "The facial treatments are amazing! My skin has never felt so refreshed and rejuvenated.",
      author: "Neha P.",
      rating: 5
    }
  ];

  useEffect(() => {
    // Load submission data from localStorage
    const savedData = localStorage.getItem('formSubmissions');
    if (savedData) {
      const { count, lastTime } = JSON.parse(savedData);
      setSubmissionCount(count);
      setLastSubmissionTime(lastTime);
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Check cooldown period
    if (lastSubmissionTime && Date.now() - lastSubmissionTime < COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil((COOLDOWN_PERIOD - (Date.now() - lastSubmissionTime)) / (60 * 1000));
      setResult(`Please wait ${remainingTime} minutes before submitting again`);
      return;
    }

    // Check daily limit
    if (submissionCount >= MAX_DAILY_SUBMISSIONS) {
      setResult("Daily submission limit reached. Please try again tomorrow.");
      return;
    }

    setIsSubmitting(true);
    setResult("Sending your message...");

    const formData = new FormData(event.target);
    formData.append("access_key", "9d9f2c54-be0f-4386-bcdc-561015d76360");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Thank you! Your message has been sent successfully.");
        event.target.reset();
        
        // Update submission tracking
        const newCount = submissionCount + 1;
        const newTime = Date.now();
        setSubmissionCount(newCount);
        setLastSubmissionTime(newTime);
        
        // Save to localStorage
        localStorage.setItem('formSubmissions', JSON.stringify({
          count: newCount,
          lastTime: newTime
        }));

        // Reset count after 24 hours
        setTimeout(() => {
          setSubmissionCount(0);
          localStorage.setItem('formSubmissions', JSON.stringify({
            count: 0,
            lastTime: newTime
          }));
        }, 24 * 60 * 60 * 1000);
      } else {
        setResult(`Error: ${data.message || 'Submission failed. Please try again.'}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="contact-page-container">
      {/* Contact Us heading section */}
      <motion.section 
        className="contact-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="main-heading">Contact Us</h1>
        <p className="sub-heading">Get in touch with our salon for appointments and inquiries</p>
      </motion.section>

      <motion.div 
        className="page-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="contact-form-container"
          variants={itemVariants}
        >
          <h1>Contact Form</h1>
          <p>Please fill the form below (max {MAX_DAILY_SUBMISSIONS} submissions per day)</p>
          
          <form className="contact-form" onSubmit={onSubmit}>
            <motion.div className="form-group" variants={itemVariants}>
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your name" 
                required
                disabled={isSubmitting}
              />
            </motion.div>
            
            <motion.div className="form-group" variants={itemVariants}>
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                required
                disabled={isSubmitting}
              />
            </motion.div>
            
            <motion.div className="form-group" variants={itemVariants}>
              <label>Message</label>
              <textarea 
                name="message"
                placeholder="Enter your message"
                required
                disabled={isSubmitting}
              ></textarea>
            </motion.div>
            
            <motion.button 
              className="submit-button" 
              type="submit"
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
          
          {result && (
            <motion.div 
              className={`message ${result.includes("Thank you") ? "success" : "error"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {result}
              {result.includes("Error") && !isSubmitting && (
                <button 
                  onClick={() => setResult("")} 
                  className="retry-button"
                >
                  Try Again
                </button>
              )}
            </motion.div>
          )}

          {/* Testimonials Carousel */}
          <motion.div 
            className="testimonials-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>What Our Clients Say</h2>
            <div className="testimonial-carousel">
              <button className="carousel-button prev" onClick={prevTestimonial}>
                <FaChevronLeft />
              </button>
              
              <motion.div 
                className="testimonial-card"
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-text">{testimonials[currentTestimonial].quote}</p>
                <div className="testimonial-author">
                  <span>- {testimonials[currentTestimonial].author}</span>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < testimonials[currentTestimonial].rating ? "star filled" : "star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <button className="carousel-button next" onClick={nextTestimonial}>
                <FaChevronRight />
              </button>
            </div>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? "active" : ""}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="sidebar"
          variants={itemVariants}
        >
          <motion.div 
            className="social-media card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="icon-title">
              <FaInstagram className="icon insta-icon" />
              <h1>Instagram</h1>
            </div>
            <p>@timeless_tendz</p>
            <p>@hair_styling</p>
            <p>@bindu_salon</p>
          </motion.div>

          <motion.div 
            className="contact-info card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="icon-title">
              <FaMapMarkerAlt className="icon address-icon" />
              <h1>Address</h1>
            </div>
            <p>Site No.2, 1st Floor, Next Reliance Mart, Kodigehalli Main Road, Ayyappa Nagar-Krishnarajapura-560036</p>
            
            <div className="icon-title">
              <FaPhone className="icon phone-icon" />
              <h1>Phone No.</h1>
            </div>
            <p>9454069609</p>
            <p>8432395496</p>
          </motion.div>

          <motion.div 
            className="business-hours card"
            whileHover={{ scale: 1.02 }}
          >
            <div className="icon-title">
              <FaClock className="icon clock-icon" />
              <h1>Business Hours</h1>
            </div>
            <p>Mon: 10.30AM – 7.30PM</p>
            <p>Tues: 10.30AM – 7.30PM</p>
            <p>Wed: 10.30AM – 6.30PM</p>
            <p>Thurs: 10.30AM – 7.30PM</p>
            <p>Fri: 10.30AM – 7.30PM</p>
            <p>Sat: 10.30AM – 8.30PM</p>
            <p>Sun: 10.30AM – 6.30PM</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contactus;