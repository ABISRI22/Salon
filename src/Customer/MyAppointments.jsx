import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SlotBooking from './SlotBooking';
import './MyAppointments.css';

function MyAppointments({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const navigate = useNavigate();

  // Updated branches data with Whitefield, Majestic, and Hosur
  const branches = [
    { 
      id: 1,
      name: "Whitefield Branch", 
      address: "123 ITPL Road, Whitefield",
      mapUrl: "https://maps.google.com/?q=123+ITPL+Road+Whitefield",
      hours: "9:00 AM - 8:00 PM",
      phone: "+1 (555) 123-4567"
    },
    { 
      id: 2,
      name: "Majestic Branch", 
      address: "456 Gandhi Nagar, Majestic",
      mapUrl: "https://maps.google.com/?q=456+Gandhi+Nagar+Majestic",
      hours: "10:00 AM - 7:00 PM",
      phone: "+1 (555) 987-6543"
    },
    { 
      id: 3,
      name: "Hosur Branch", 
      address: "789 Electronic City, Hosur",
      mapUrl: "https://maps.google.com/?q=789+Electronic+City+Hosur",
      hours: "8:30 AM - 9:00 PM",
      phone: "+1 (555) 456-7890"
    }
  ];

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('salonAppointments');
    
    if (savedAppointments) {
      const parsedAppointments = JSON.parse(savedAppointments);
      setAppointments(parsedAppointments);
      setFilteredAppointments(parsedAppointments);
    } else {
      // Only use sample data if there are no saved appointments
      const sampleAppointments = [
        {
          id: 1,
          service: "Haircut & Styling",
          stylist: "John",
          date: "2023-10-15",
          time: "10:30 AM",
          duration: "45 mins",
          price: "800",
          status: "confirmed",
          image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhaXJjdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
          branchId: 1,
          customerName: "Sample Customer",
          customerEmail: "sample@example.com",
          customerPhone: "1234567890"
        },
        {
          id: 2,
          service: "Facial Treatment",
          stylist: "David",
          date: "2023-10-18",
          time: "2:00 PM",
          duration: "60 mins",
          price: "700",
          status: "completed",
          image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsJTIwdHJlYXRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
          branchId: 2,
          customerName: "Sample Customer",
          customerEmail: "sample@example.com",
          customerPhone: "1234567890"
        }
      ];
      
      setAppointments(sampleAppointments);
      setFilteredAppointments(sampleAppointments);
      localStorage.setItem('salonAppointments', JSON.stringify(sampleAppointments));
    }
    setIsLoading(false);
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('salonAppointments', JSON.stringify(appointments));
  }, [appointments]);

  // Filter appointments based on status
  useEffect(() => {
    if (filter === 'all') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter(app => app.status === filter));
    }
  }, [filter, appointments]);

  // Get branch info by ID
  const getBranchInfo = (branchId) => {
    return branches.find(branch => branch.id === branchId) || branches[0];
  };

  // Handle appointment cancellation
  const handleCancel = (id) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(app => 
        app.id === id ? {...app, status: 'cancelled'} : app
      )
    );
  };

  // Handle booking a new appointment
  const handleBookNew = () => {
    setShowBooking(true);
  };

  // Handle back to appointments list
  const handleBackToAppointments = () => {
    setShowBooking(false);
  };

  // Add a new appointment from SlotBooking
  const addNewAppointment = (newAppointment) => {
    setAppointments(prev => [...prev, newAppointment]);
  };

  // Function to send WhatsApp reminder
  const sendWhatsAppReminder = (appointment) => {
    const branchInfo = getBranchInfo(appointment.branchId);
    const message = `Hi ${appointment.customerName}, this is a reminder for your appointment for ${appointment.service} with ${appointment.stylist} on ${appointment.date} at ${appointment.time} at ${branchInfo.name}. Address: ${branchInfo.address}. Thank you for choosing us!`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/91${appointment.customerPhone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge class
  const getStatusClass = (status) => {
    switch(status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <div className="appointments-loading">
        <motion.div 
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <p>Loading your appointments...</p>
      </div>
    );
  }

  if (showBooking) {
    return (
      <div className="booking-section">
        <motion.button 
          className="back-button"
          onClick={handleBackToAppointments}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <i className="fas fa-arrow-left"></i> Back to Appointments
        </motion.button>
        <SlotBooking 
          branches={branches} 
          addNewAppointment={addNewAppointment}
          onBack={handleBackToAppointments}
        />
      </div>
    );
  }

  return (
    <div className="my-appointments">
      <motion.div 
        className="appointments-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My Appointments</h1>
        <p>Manage and view your upcoming and past appointments</p>
        
        {/* Branch Information Section */}
        <div className="branches-section">
          <h2>Our Salon Locations</h2>
          <div className="branches-list">
            {branches.map(branch => (
              <motion.div 
                key={branch.id}
                className="branch-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3>{branch.name}</h3>
                <p>{branch.address}</p>
                <p><strong>Hours:</strong> {branch.hours}</p>
                <p><strong>Phone:</strong> {branch.phone}</p>
                <a 
                  href={branch.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  <i className="fas fa-map-marker-alt"></i> View on Map
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="appointments-controls">
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All Appointments
          </button>
          <button 
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={filter === 'cancelled' ? 'active' : ''}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>

        <motion.button 
          className="book-new-btn"
          onClick={handleBookNew}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-plus"></i> Book New Appointment
        </motion.button>
      </div>

      {filteredAppointments.length === 0 ? (
        <motion.div 
          className="no-appointments"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <i className="fas fa-calendar-times"></i>
          <h3>No appointments found</h3>
          <p>You don't have any {filter !== 'all' ? filter : ''} appointments at the moment.</p>
          <button onClick={handleBookNew}>Book Your First Appointment</button>
        </motion.div>
      ) : (
        <motion.div 
          className="appointments-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredAppointments.map(appointment => {
            const branchInfo = getBranchInfo(appointment.branchId);
            return (
              <motion.div 
                key={appointment.id}
                className="appointment-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="appointment-image">
                  <img src={appointment.image} alt={appointment.service} />
                </div>
                
                <div className="appointment-details">
                  <h3>{appointment.service}</h3>
                  <p className="stylist">With {appointment.stylist}</p>
                  
                  <div className="appointment-info">
                    <div className="info-item">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-clock"></i>
                      <span>{appointment.time} ({appointment.duration})</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-rupee-sign"></i>
                      <span>{appointment.price}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{branchInfo.name}</span>
                    </div>
                    {appointment.customerPhone && appointment.customerPhone !== 'Not provided' && (
                      <div className="info-item">
                        <i className="fas fa-phone"></i>
                        <span>{appointment.customerPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="appointment-actions">
                  <div className={`status-badge ${getStatusClass(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </div>
                  
                  {appointment.status === 'confirmed' && (
                    <div className="action-buttons">
                      <button 
                        className="cancel-btn"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </button>
                      {appointment.customerPhone && appointment.customerPhone !== 'Not provided' && (
                        <button 
                          className="whatsapp-btn"
                          onClick={() => sendWhatsAppReminder(appointment)}
                          title="Send WhatsApp reminder"
                        >
                          <i className="fab fa-whatsapp"></i> Remind
                        </button>
                      )}
                    </div>
                  )}
                  
                  {appointment.status === 'pending' && (
                    <div className="pending-actions">
                      <button className="modify-btn">Modify</button>
                      <button 
                        className="cancel-btn"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  
                  {(appointment.status === 'completed' || appointment.status === 'cancelled') && (
                    <button className="book-again-btn" onClick={handleBookNew}>
                      Book Again
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default MyAppointments;