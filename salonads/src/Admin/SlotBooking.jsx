
// src/Admin/SlotBooking.jsx
import React, { useState, useEffect } from 'react';

const SlotBooking = () => {
  // Initialize with empty arrays to prevent undefined errors
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState('booking'); // 'booking' or 'appointments'
  const [whatsappStatus, setWhatsappStatus] = useState('connecting');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [bookingSource, setBookingSource] = useState('in-person'); // 'in-person' or 'online'

  // Sample data
  const sampleServices = [
    { id: 1, name: 'Haircut', duration: 30, price: 25 },
    { id: 2, name: 'Hair Coloring', duration: 90, price: 85 },
    { id: 3, name: 'Facial', duration: 60, price: 50 },
    { id: 4, name: 'Manicure', duration: 45, price: 35 },
    { id: 5, name: 'Pedicure', duration: 45, price: 40 },
  ];

  // Sample branches data
  const sampleBranches = [
    { 
      id: 1, 
      name: 'Whitefield Branch', 
      address: '123 Beauty Salon Street, Whitefield, Bangalore',
      staff: ['John', 'Sarah', 'Mike']
    },
    { 
      id: 2, 
      name: 'Hosur', 
      address: '456 Style Avenue, Koramangala, Bangalore',
      staff: ['Emma', 'David', 'Priya']
    },
    { 
      id: 3, 
      name: 'Majestic', 
      address: '789 Glamour Road, Indiranagar, Bangalore',
      staff: ['Alex', 'Lisa', 'Rahul']
    }
  ];

  // WhatsApp service simulation
  const whatsappService = {
    isReady: true,
    sendMessage: async (phone, message) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`WhatsApp message to ${phone}: ${message}`);
          resolve(true);
        }, 1000);
      });
    }
  };

  // Monitor WhatsApp status
  useEffect(() => {
    const checkStatus = () => {
      setWhatsappStatus(whatsappService.isReady ? 'connected' : 'disconnected');
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const fetchData = () => {
      try {
        setIsLoading(true);
        setServices(sampleServices);
        setBranches(sampleBranches);
        setError(null);
        
        // Load appointments from localStorage - use the same key as customer view
        const savedAppointments = localStorage.getItem('salonAppointments');
        if (savedAppointments) {
          setAppointments(JSON.parse(savedAppointments));
        }
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('salonAppointments', JSON.stringify(appointments));
  }, [appointments]);

  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 9 * 60; // 9:00 AM in minutes
    const endTime = 18 * 60; // 6:00 PM in minutes
    const interval = 30; // 30 minutes
    
    // Get existing appointments for the selected date and branch
    const dateAppointments = appointments.filter(
      apt => apt.date === selectedDate && apt.branchId === parseInt(selectedBranch)
    );
    
    for (let time = startTime; time <= endTime; time += interval) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      // Check if this time slot is already booked
      const isBooked = dateAppointments.some(apt => apt.time === timeString);
      
      slots.push({
        id: time,
        time: timeString,
        available: !isBooked
      });
    }
    
    return slots;
  };

  useEffect(() => {
    if (selectedDate && selectedBranch) {
      setAvailableSlots(generateTimeSlots());
    }
  }, [selectedDate, selectedBranch, appointments]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot(null);
  };

  const handleServiceSelect = (e) => {
    setSelectedService(e.target.value);
  };

  const handleBranchSelect = (e) => {
    setSelectedBranch(e.target.value);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
    }
  };

  // Send WhatsApp reminder function
  const sendWhatsAppReminder = async (appointment) => {
    if (!appointment.customerPhone) {
      console.log('No phone number provided for WhatsApp reminder');
      return false;
    }

    const message = `Hi ${appointment.customerName}, your appointment for ${appointment.serviceName} with ${appointment.staff} is confirmed for ${appointment.date} at ${appointment.time} at ${appointment.branchName}. Address: ${appointment.branchAddress}. Thank you for choosing us!`;

    try {
      const success = await whatsappService.sendMessage(appointment.customerPhone, message);
      
      if (success) {
        console.log('WhatsApp reminder sent successfully');
        return true;
      } else {
        console.log('Failed to send WhatsApp reminder');
        return false;
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  };

  // Handle booking function
  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedSlot || !customerName || !customerEmail || !selectedBranch) {
      alert('Please fill in all required fields: service, branch, date, time slot, name, and email.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Create new appointment with all necessary details
    const selectedServiceObj = services.find(s => s.id === parseInt(selectedService));
    const selectedBranchObj = branches.find(b => b.id === parseInt(selectedBranch));
    
    // Select a random staff member from the branch
    const randomStaff = selectedBranchObj.staff[Math.floor(Math.random() * selectedBranchObj.staff.length)];
    
    const newAppointment = {
      id: Date.now(),
      serviceId: selectedService,
      serviceName: selectedServiceObj?.name,
      branchId: selectedBranch,
      branchName: selectedBranchObj?.name,
      branchAddress: selectedBranchObj?.address,
      date: selectedDate,
      time: selectedSlot.time,
      customerName,
      customerEmail,
      customerPhone,
      staff: randomStaff,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      source: bookingSource
    };

    // Add to appointments
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    
    // Save to localStorage - use the same key that CustomerAppointments expects
    localStorage.setItem('salonAppointments', JSON.stringify(updatedAppointments));
    
    // Send WhatsApp reminder
    const whatsappSent = await sendWhatsAppReminder(newAppointment);
    
    alert(`Booking confirmed for ${customerName} on ${selectedDate} at ${selectedSlot.time} at ${selectedBranchObj.name}!${whatsappSent ? ' A confirmation message has been sent via WhatsApp.' : ''}`);
    
    // Reset form
    setSelectedService('');
    setSelectedBranch('');
    setSelectedDate('');
    setSelectedSlot(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setBookingSource('in-person');
  };

  const cancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      const updatedAppointments = appointments.filter(apt => apt.id !== appointmentId);
      setAppointments(updatedAppointments);
      localStorage.setItem('salonAppointments', JSON.stringify(updatedAppointments));
    }
  };

  // Get today's date in YYYY-MM-DD format for the date input min value
  const today = new Date().toISOString().split('T')[0];

  // Filter upcoming appointments (from today onward)
  const upcomingAppointments = appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });

  if (isLoading) {
    return (
      <div className="slot-booking-container">
        <div className="loading-spinner"></div>
        <p>Loading available services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="slot-booking-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="slot-booking-container">
      <div className="whatsapp-status-container">
        <div className={`whatsapp-status ${whatsappStatus}`}>
          WhatsApp: {whatsappStatus === 'connected' ? 'Connected' : 'Connecting...'}
        </div>
        <small>{whatsappStatus === 'connected' ? 'Automatic reminders enabled' : 'Reminders will be sent once connected'}</small>
      </div>

      <div className="view-toggle">
        <button 
          className={view === 'booking' ? 'active' : ''}
          onClick={() => setView('booking')}
        >
          Book Appointment
        </button>
        <button 
          className={view === 'appointments' ? 'active' : ''}
          onClick={() => setView('appointments')}
        >
          Appointments ({upcomingAppointments.length})
        </button>
      </div>

      {view === 'booking' ? (
        <div className="slot-booking-card">
          <h2>Book Customer Appointment</h2>
          <p className="subtitle">Select a branch, service, date, and available time slot</p>

          <div className="booking-form">
            <div className="form-group">
              <label htmlFor="branch">Select Branch *</label>
              <select 
                id="branch" 
                value={selectedBranch} 
                onChange={handleBranchSelect}
                className="form-select"
              >
                <option value="">Choose a branch</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="service">Select Service *</label>
              <select 
                id="service" 
                value={selectedService} 
                onChange={handleServiceSelect}
                className="form-select"
              >
                <option value="">Choose a service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} (${service.price}, {service.duration} mins)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Select Date *</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={today}
                className="form-input"
              />
            </div>

            <div className="customer-details">
              <h3>Customer Details</h3>
              <div className="form-group">
                <label htmlFor="customerName">Full Name *</label>
                <input
                  type="text"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input"
                  placeholder="Enter customer's full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerEmail">Email *</label>
                <input
                  type="email"
                  id="customerEmail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter customer's email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number (WhatsApp)</label>
                <input
                  type="tel"
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="form-input"
                  placeholder="Enter customer's WhatsApp number for reminders"
                />
                <small>Automatic confirmation and reminder messages will be sent</small>
              </div>
            </div>

            {selectedDate && selectedBranch && (
              <div className="time-slots-container">
                <h3>Available Time Slots for {selectedDate}</h3>
                <div className="time-slots-grid">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.id}
                      className={`time-slot ${slot.available ? '' : 'unavailable'} ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                      onClick={() => handleSlotSelect(slot)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                      {!slot.available && <span className="slot-status">Booked</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedSlot && (
              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <p><strong>Source:</strong> {bookingSource === 'online' ? 'Online' : 'In-Person'}</p>
                <p><strong>Branch:</strong> {branches.find(b => b.id === parseInt(selectedBranch))?.name}</p>
                <p><strong>Service:</strong> {services.find(s => s.id === parseInt(selectedService))?.name}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedSlot.time}</p>
                <p><strong>Customer:</strong> {customerName}</p>
                {customerPhone && <p><strong>WhatsApp:</strong> {customerPhone}</p>}
                <button 
                  className="book-now-btn"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="appointments-card">
          <h2>Appointments Management</h2>
          
          {upcomingAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>No upcoming appointments.</p>
            </div>
          ) : (
            <div className="appointments-list">
              {upcomingAppointments.map(appointment => (
                <div 
                  key={appointment.id}
                  className="appointment-item"
                >
                  <div className="appointment-details">
                    <h3>{appointment.serviceName}</h3>
                    <p><strong>Source:</strong> {appointment.source === 'online' ? 'Online' : 'In-Person'}</p>
                    <p><strong>Branch:</strong> {appointment.branchName}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Customer:</strong> {appointment.customerName}</p>
                    <p><strong>Email:</strong> {appointment.customerEmail}</p>
                    <p><strong>Staff:</strong> {appointment.staff}</p>
                    {appointment.customerPhone && <p><strong>WhatsApp:</strong> {appointment.customerPhone}</p>}
                    <p className={`status ${appointment.status}`}>{appointment.status}</p>
                  </div>
                  <div className="appointment-actions">
                    <button 
                      className="cancel-btn"
                      onClick={() => cancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                    {appointment.customerPhone && (
                      <button 
                        className="reminder-btn"
                        onClick={() => sendWhatsAppReminder(appointment)}
                      >
                        Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    


 </div>
  );
};

export default SlotBooking;