// src/Admin/OnlineScheduling.jsx
import React, { useState, useEffect } from 'react';
import './OnlineScheduling.css';

const OnlineScheduling = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const loadAppointments = () => {
      try {
        const savedAppointments = localStorage.getItem('admin-appointments');
        if (savedAppointments) {
          setAppointments(JSON.parse(savedAppointments));
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error('Error loading appointments:', err);
        setAppointments([]);
      }
    };

    loadAppointments();
    
    // Listen for storage events to update when changes occur from other tabs/components
    const handleStorageChange = (e) => {
      if (e.key === 'admin-appointments') {
        setAppointments(JSON.parse(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter appointments based on selected filters
  const filteredAppointments = appointments.filter(apt => {
    const matchesDate = filterDate ? apt.date === filterDate : true;
    const matchesStatus = filterStatus !== 'all' ? apt.status === filterStatus : true;
    return matchesDate && matchesStatus;
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const updateAppointmentStatus = (id, status) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? {...apt, status} : apt
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('admin-appointments', JSON.stringify(updatedAppointments));
  };

  const deleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const updatedAppointments = appointments.filter(apt => apt.id !== id);
      setAppointments(updatedAppointments);
      localStorage.setItem('admin-appointments', JSON.stringify(updatedAppointments));
    }
  };

  return (
    <div className="scheduling-container">
      <h2>Online Scheduling</h2>
      <p>View and manage all customer appointments</p>
      
      <div className="scheduling-filters">
        <div className="filter-group">
          <label htmlFor="filterDate">Filter by Date:</label>
          <input
            type="date"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="filterStatus">Filter by Status:</label>
          <select
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        
        <button 
          className="clear-filters-btn"
          onClick={() => {
            setFilterDate('');
            setFilterStatus('all');
          }}
        >
          Clear Filters
        </button>
      </div>
      
      <div className="appointments-summary">
        <div className="summary-card">
          <h3>Total Appointments</h3>
          <span className="count">{appointments.length}</span>
        </div>
        
        <div className="summary-card">
          <h3>Confirmed</h3>
          <span className="count confirmed">
            {appointments.filter(apt => apt.status === 'confirmed').length}
          </span>
        </div>
        
        <div className="summary-card">
          <h3>Today's Appointments</h3>
          <span className="count today">
            {appointments.filter(apt => apt.date === today).length}
          </span>
        </div>
      </div>
      
      {filteredAppointments.length === 0 ? (
        <div className="no-appointments">
          <p>No appointments found matching your filters.</p>
        </div>
      ) : (
        <div className="appointments-table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Contact Info</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td className="customer-info">
                    <div className="customer-name">{appointment.customerName}</div>
                  </td>
                  <td>{appointment.serviceName}</td>
                  <td>
                    <div className="datetime-cell">
                      <div className="appointment-date">{appointment.date}</div>
                      <div className="appointment-time">{appointment.time}</div>
                    </div>
                  </td>
                  <td className="contact-info">
                    <div className="contact-email">{appointment.customerEmail}</div>
                    {appointment.customerPhone && (
                      <div className="contact-phone">{appointment.customerPhone}</div>
                    )}
                  </td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                      className={`status-select ${appointment.status}`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="view-btn"
                        onClick={() => setSelectedAppointment(appointment)}
                      >
                        View
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Appointment Details</h3>
              <button 
                className="close-modal"
                onClick={() => setSelectedAppointment(null)}
              >
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h4>Service Information</h4>
                <p><strong>Service:</strong> {selectedAppointment.serviceName}</p>
                <p><strong>Date:</strong> {selectedAppointment.date}</p>
                <p><strong>Time:</strong> {selectedAppointment.time}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-badge ${selectedAppointment.status}`}>
                    {selectedAppointment.status}
                  </span>
                </p>
              </div>
              
              <div className="detail-section">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> {selectedAppointment.customerName}</p>
                <p><strong>Email:</strong> {selectedAppointment.customerEmail}</p>
                {selectedAppointment.customerPhone && (
                  <p><strong>Phone:</strong> {selectedAppointment.customerPhone}</p>
                )}
              </div>
              
              <div className="detail-section">
                <h4>Appointment History</h4>
                <p><strong>Booked on:</strong> {new Date(selectedAppointment.bookedAt).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setSelectedAppointment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineScheduling;