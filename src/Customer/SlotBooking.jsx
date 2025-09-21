// src/Admin/SlotBooking.jsx
import React, { useState, useEffect } from 'react';
import { getAllAppointments, saveAppointment, deleteAppointment } from './Appointmentmanger';
import './SlotBooking.css';

const SlotBooking = ({ onAppointmentBooked }) => {
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
  const [customerDetailsView, setCustomerDetailsView] = useState(null); // For viewing customer details
  const [selectedViewDate, setSelectedViewDate] = useState(new Date().toLocaleDateString('en-CA')); // For viewing appointments by date
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map' for appointments view

  // Sample data
  const sampleServices = [
    { id: 1, name: 'Haircut', duration: 50, price: 1000 },
    { id: 2, name: 'Hair Coloring', duration: 90, price: 1500 },
    { id: 3, name: 'Facial', duration: 60, price: 1000 },
    { id: 4, name: 'Manicure', duration: 45, price: 1200 },
    { id: 5, name: 'Pedicure', duration: 45, price: 1100 },
    { id: 6, name: 'AntiDandruff', duration: 90, price: 1300 },
    { id: 7, name: 'Kerasmooth', duration: 60, price: 1500 },
    { id: 8, name: 'Acne Treatment', duration: 120, price: 2000 },
    { id: 9, name: 'Glass Treatment', duration: 90, price: 3000 },
    { id: 10, name: 'Waxing', duration: 60, price: 1100 },
    { id: 11, name: 'Detanning', duration: 80, price: 1200 },
  ];

  // Sample branches data with coordinates for mapping
  const sampleBranches = [
    { 
      id: 1, 
      name: 'Whitefield Branch', 
      address: '123 Beauty Salon Street, Whitefield, Bangalore',
      staff: ['John', 'Sarah', 'Mike'],
      lat: 12.9716,
      lng: 77.5946,
      mapUrl: "https://maps.google.com/?q=12.9716,77.5946"
    },
    { 
      id: 2, 
      name: 'Hosur', 
      address: '456 Style Avenue, Koramangala, Bangalore',
      staff: ['Emma', 'David', 'Priya'],
      lat: 12.9352,
      lng: 77.6245,
      mapUrl: "https://maps.google.com/?q=12.9352,77.6245"
    },
    { 
      id: 3, 
      name: 'Majestic', 
      address: '789 Glamour Road, Indiranagar, Bangalore',
      staff: ['Alex', 'Lisa', 'Rahul'],
      lat: 12.9774,
      lng: 77.5711,
      mapUrl: "https://maps.google.com/?q=12.9774,77.5711"
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

  // Load appointments from file storage on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setServices(sampleServices);
        setBranches(sampleBranches);
        setError(null);
        
        // Load appointments from centralized storage
        const savedAppointments = getAllAppointments();
        setAppointments(savedAppointments);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Handle booking function - updated to use file storage
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

    try {
      // Create new appointment with all necessary details
      const selectedServiceObj = services.find(s => s.id === parseInt(selectedService));
      const selectedBranchObj = branches.find(b => b.id === parseInt(selectedBranch));
      
      if (!selectedServiceObj || !selectedBranchObj) {
        throw new Error('Invalid service or branch selection');
      }
      
      // Select a random staff member from the branch
      const randomStaff = selectedBranchObj.staff[Math.floor(Math.random() * selectedBranchObj.staff.length)];
      
      const newAppointment = {
        id: Date.now(),
        serviceId: selectedService,
        serviceName: selectedServiceObj.name,
        branchId: selectedBranch,
        branchName: selectedBranchObj.name,
        branchAddress: selectedBranchObj.address,
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

      // Save to file storage
      const saveSuccess = saveAppointment(newAppointment);
      
      if (saveSuccess) {
        // Add to local state
        setAppointments(prev => [...prev, newAppointment]);
        
        // Notify parent component about the new appointment
        if (onAppointmentBooked) {
          onAppointmentBooked();
        }
        
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
      } else {
        throw new Error('Failed to save appointment');
      }
    } catch (err) {
      alert('Failed to save appointment. Please try again.');
      console.error('Booking error:', err);
    }
  };

  // Update cancelAppointment to use file storage
  const cancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const deleteSuccess = deleteAppointment(appointmentId);
        
        if (deleteSuccess) {
          setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
          
          // Notify parent component about the change
          if (onAppointmentBooked) {
            onAppointmentBooked();
          }
        } else {
          throw new Error('Delete operation failed');
        }
      } catch (err) {
        alert('Failed to cancel appointment. Please try again.');
        console.error('Cancellation error:', err);
      }
    }
  };

  // View customer details
  const viewCustomerDetails = (appointment) => {
    setCustomerDetailsView(appointment);
  };

  // Close customer details view
  const closeCustomerDetails = () => {
    setCustomerDetailsView(null);
  };

  // Reset all data
  const resetData = async () => {
    if (window.confirm('Are you sure you want to reset all data? This will delete all appointments.')) {
      try {
        // Clear all appointments from storage
        localStorage.removeItem('salonAppointments');
        
        // Clear state
        setAppointments([]);
        
        // Notify parent component about the change
        if (onAppointmentBooked) {
          onAppointmentBooked();
        }
        
        alert('All data has been reset successfully.');
      } catch (err) {
        alert('Failed to reset data. Please try again.');
        console.error('Reset error:', err);
      }
    }
  };

  // Get today's date in YYYY-MM-DD format for the date input min value
  const today = new Date().toISOString().split('T')[0];

  // Filter appointments by selected date
  const filteredAppointments = appointments
    .filter(apt => apt.date === selectedViewDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Get all unique customers
  const allCustomers = [...new Map(
    appointments.map(appointment => [
      appointment.customerEmail, 
      {
        name: appointment.customerName,
        email: appointment.customerEmail,
        phone: appointment.customerPhone,
        appointments: appointments.filter(apt => apt.customerEmail === appointment.customerEmail)
      }
    ])
  ).values()];

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
          Today's Appointments ({appointments.length})
        </button>
         <button 
          className={view === 'customers' ? 'active' : ''}
          onClick={() => setView('customers')}
        >
          All Appointments ({allCustomers.length})
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

            {selectedBranch && (
              <div className="branch-map-preview">
                <h4>Location: {branches.find(b => b.id === parseInt(selectedBranch))?.name}</h4>
                <div className="map-container">
                  <iframe
                    width="100%"
                    height="200"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${branches.find(b => b.id === parseInt(selectedBranch))?.lat},${branches.find(b => b.id === parseInt(selectedBranch))?.lng}&z=15&output=embed`}
                    allowFullScreen
                    title="Branch Location"
                  ></iframe>
                </div>
                <p className="branch-address">
                  <i className="fas fa-map-marker-alt"></i> 
                  {branches.find(b => b.id === parseInt(selectedBranch))?.address}
                </p>
                <a 
                  href={branches.find(b => b.id === parseInt(selectedBranch))?.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-full-map-link"
                >
                  <i className="fas fa-external-link-alt"></i> View full map
                </a>
              </div>
            )}

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
                    {service.name} (₹{service.price}, {service.duration} mins)
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
                      className={`time-slot ${slot.available ? '' : 'unavailable booked-slot'} ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
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
      ) : view === 'appointments' ? (
        <div className="appointments-card">
          <div className="appointments-header">
            <h2>Appointment Schedule</h2>
            <div className="appointment-actions">
              <div className="date-selector">
                <label htmlFor="viewDate">Date: </label>
                <input
                  type="date"
                  id="viewDate"
                  value={selectedViewDate}
                  onChange={(e) => setSelectedViewDate(e.target.value)}
                  className="form-input"
                />
              </div>
              <button className="reset-btn" onClick={resetData}>
                Reset Data
              </button>
            </div>
          </div>
          
          <h3>Appointments for {selectedViewDate}</h3>
          
          {/* Map View Toggle */}
          <div className="view-toggle-map">
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              Appointment List
            </button>
            <button 
              className={viewMode === 'map' ? 'active' : ''}
              onClick={() => setViewMode('map')}
            >
             Salon Locations
            </button>
          </div>
          
          {viewMode === 'list' ? (
            filteredAppointments.length === 0 ? (
              <div className="no-appointments">
                <p>No appointments scheduled for this date.</p>
              </div>
            ) : (
              <div className="appointments-list">
                {filteredAppointments.map(appointment => (
                  <div 
                    key={appointment.id}
                    className={`appointment-item ${appointment.status === 'confirmed' ? 'confirmed-appointment' : ''}`}
                  >
                    <div className="appointment-details">
                      <h3>{appointment.serviceName}</h3>
                  
                      <p><strong>Branch:</strong> {appointment.branchName}</p>
                      <p><strong>Time:</strong> {appointment.time}</p>
                      <p><strong>Customer:</strong> {appointment.customerName}</p>
                      <p><strong>Email:</strong> {appointment.customerEmail}</p>
                      <p><strong>Staff:</strong> {appointment.staff}</p>
                      {appointment.customerPhone && <p><strong>WhatsApp:</strong> {appointment.customerPhone}</p>}
                      <p className={`status ${appointment.status}`}>{appointment.status}</p>
                    </div>
                    <div className="appointment-actions">
                      <button 
                        className="view-customer-btn"
                        onClick={() => viewCustomerDetails(appointment)}
                      >
                        View Customer
                      </button>
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
                          Confirmed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="map-view">
              <h4>Appointments by Location</h4>
              <div className="branches-map">
                {branches.map(branch => {
                  const branchAppointments = filteredAppointments.filter(
                    apt => apt.branchId === branch.id
                  );
                  
                  return (
                    <div key={branch.id} className="branch-map-item">
                      <div className="branch-map-header">
                        <h4>{branch.name}</h4>
                        <span className="appointment-count">
                          {branchAppointments.length} appointment{branchAppointments.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="map-container">
                        <iframe
                          width="100%"
                          height="200"
                          frameBorder="0"
                          style={{ border: 0 }}
                          src={`https://maps.google.com/maps?q=${branch.lat},${branch.lng}&z=15&output=embed`}
                          allowFullScreen
                          title={branch.name}
                        ></iframe>
                      </div>
                      
                      {branchAppointments.length > 0 ? (
                        <div className="branch-appointments">
                          <h5>Appointments at this branch:</h5>
                          {branchAppointments.map(appointment => (
                            <div key={appointment.id} className="branch-appointment-item">
                              <p><strong>{appointment.customerName}</strong> - {appointment.serviceName}</p>
                              <p>{appointment.time} with {appointment.staff}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="no-branch-appointments">No appointments at this branch for the selected date.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="customers-card">
          <h2>Customer Management</h2>
          
          {allCustomers.length === 0 ? (
            <div className="no-customers">
              <p>No customers found.</p>
            </div>
          ) : (
            <div className="customers-list">
              {allCustomers.map(customer => (
                <div 
                  key={customer.email}
                  className="customer-item"
                  onClick={() => viewCustomerDetails(customer)}
                >
                  <div className="customer-avatar">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="customer-info">
                    <h3>{customer.name}</h3>
                    <p>{customer.email}</p>
                    {customer.phone && <p>{customer.phone}</p>}
                    <p className="appointments-count">
                      {customer.appointments.length} appointment{customer.appointments.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Customer Details Modal */}
      {customerDetailsView && (
        <div className="modal-overlay" onClick={closeCustomerDetails}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Customer Details</h2>
              <button className="close-modal" onClick={closeCustomerDetails}>×</button>
            </div>
            
            <div className="customer-details-modal">
              <div className="customer-profile">
                <div className="customer-avatar large">
                  {customerDetailsView.customerName?.charAt(0).toUpperCase() || 
                   customerDetailsView.name?.charAt(0).toUpperCase()}
                </div>
                <h3>{customerDetailsView.customerName || customerDetailsView.name}</h3>
                <p>{customerDetailsView.customerEmail || customerDetailsView.email}</p>
                {customerDetailsView.customerPhone || customerDetailsView.phone ? (
                  <p>{customerDetailsView.customerPhone || customerDetailsView.phone}</p>
                ) : null}
              </div>
              
              <div className="customer-appointments">
                <h3>Appointment History</h3>
                {customerDetailsView.appointments ? (
                  customerDetailsView.appointments.map(appointment => (
                    <div key={appointment.id} className="appointment-history-item confirmed-appointment">
                      <p><strong>{appointment.serviceName}</strong> at {appointment.branchName}</p>
                      <p>{appointment.date} at {appointment.time}</p>
                      <p>With {appointment.staff}</p>
                      <p className={`status ${appointment.status}`}>{appointment.status}</p>
                    </div>
                  ))
                ) : (
                  <div className="appointment-history-item confirmed-appointment">
                    <p><strong>{customerDetailsView.serviceName}</strong> at {customerDetailsView.branchName}</p>
                    <p>{customerDetailsView.date} at {customerDetailsView.time}</p>
                    <p>With {customerDetailsView.staff}</p>
                    <p className={`status ${customerDetailsView.status}`}>{customerDetailsView.status}</p>
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button className="secondary-btn" onClick={closeCustomerDetails}>
                  Close
                </button>
                {(customerDetailsView.customerPhone || customerDetailsView.phone) && (
                  <button 
                    className="reminder-btn"
                    onClick={() => {
                      sendWhatsAppReminder(customerDetailsView);
                      closeCustomerDetails();
                    }}
                  >
                    Send WhatsApp
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotBooking;