// src/CustomerAppointments/CustomerAppointments.jsx
import React, { useState, useEffect } from 'react';
import './CustomerAppointments.css';

const CustomerAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('upcoming'); // 'upcoming' or 'past'

  // Load appointments from localStorage
  useEffect(() => {
    const loadAppointments = () => {
      // Try to get appointments from both possible keys
      const salonAppointments = localStorage.getItem('salonAppointments');
      const adminAppointments = localStorage.getItem('admin-appointments');
      
      if (salonAppointments) {
        setAppointments(JSON.parse(salonAppointments));
        console.log('Loaded appointments from salonAppointments key');
      } else if (adminAppointments) {
        setAppointments(JSON.parse(adminAppointments));
        console.log('Loaded appointments from admin-appointments key');
      } else {
        console.log('No appointments found in localStorage');
        setAppointments([]);
      }
      
      setIsLoading(false);
    };

    loadAppointments();
  }, []);

  // Get today's date for filtering
  const today = new Date().toISOString().split('T')[0];

  // Filter appointments based on view
  const filteredAppointments = appointments
    .filter(apt => {
      if (view === 'upcoming') {
        return apt.date >= today;
      } else {
        return apt.date < today;
      }
    })
    .sort((a, b) => {
      // Sort by date, then by time
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    });

  // Counts for statistics
  const totalAppointments = appointments.length;
  const upcomingCount = appointments.filter(apt => apt.date >= today).length;
  const completedCount = appointments.filter(apt => apt.date < today).length;

  if (isLoading) {
    return (
      <div className="customer-appointments-container">
        <div className="loading-spinner"></div>
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="customer-appointments-container">
      <header className="appointments-header">
        <h1>Customer Appointments</h1>
        <p>Manage all customer appointments through the online booking system</p>
      </header>

      <div className="storage-info">
        <p><strong>LocalStorage Keys Found:</strong> salonAppointments, admin-appointments</p>
        <p><strong>Appointments Loaded:</strong> {appointments.length}</p>
      </div>

      <div className="view-toggle">
        <button 
          className={view === 'upcoming' ? 'active' : ''}
          onClick={() => setView('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={view === 'past' ? 'active' : ''}
          onClick={() => setView('past')}
        >
          Past
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search appointments..."
          className="search-input"
        />
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>{totalAppointments}</h3>
          <p>Total Appointments</p>
        </div>
        <div className="stat-card">
          <h3>{upcomingCount}</h3>
          <p>Upcoming</p>
        </div>
        <div className="stat-card">
          <h3>{completedCount}</h3>
          <p>Completed</p>
        </div>
      </div>

      <h2>{view === 'upcoming' ? 'Upcoming' : 'Past'} Appointments</h2>
      
      {filteredAppointments.length === 0 ? (
        <div className="no-appointments">
          <p>No {view} appointments found.</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <h3>{appointment.serviceName}</h3>
                <span className={`status-badge ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>
              
              <div className="appointment-details">
                <div className="detail-row">
                  <span className="label">Date:</span>
                  <span className="value">{appointment.date}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Time:</span>
                  <span className="value">{appointment.time}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Customer:</span>
                  <span className="value">{appointment.customerName}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Staff:</span>
                  <span className="value">{appointment.staff}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Branch:</span>
                  <span className="value">{appointment.branchName}</span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Booking Type:</span>
                  <span className="value">
                    {appointment.source === 'online' ? 'Online Booking' : 'In-Person'}
                  </span>
                </div>
              </div>
              
              {appointment.customerPhone && (
                <div className="contact-info">
                  <span className="label">Contact:</span>
                  <span className="value">{appointment.customerPhone}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerAppointments;