import React from 'react';
import './AppointmentDetails.css';

const AppointmentDetails = ({ appointment, onUpdateStatus }) => {
  if (!appointment) {
    return (
      <div className="no-appointment-selected">
        <img 
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP" 
          alt="No appointment selected"
          className="empty-icon"
        />
        <h3>No appointment selected</h3>
        <p>Select an appointment from the list to view details</p>
      </div>
    );
  }

  return (
    <div className="appointment-details">
      <div className="details-header">
        <h3>Appointment Details</h3>
      </div>
      <div className="details-content">
        <div className="detail-item">
          <h4>Client</h4>
          <p>{appointment.patientName}</p>
        </div>
        
        <div className="detail-grid">
          <div className="detail-item">
            <h4>Date</h4>
            <p>{appointment.date}</p>
          </div>
          <div className="detail-item">
            <h4>Time</h4>
            <p>{appointment.time}</p>
          </div>
        </div>

        <div className="detail-item">
          <h4>Duration</h4>
          <p>{appointment.duration} minutes</p>
        </div>

        <div className="detail-item">
          <h4>Service</h4>
          <p>{appointment.service}</p>
        </div>

        <div className="detail-item">
          <h4>Status</h4>
          <div className="status-actions">
            <button
              onClick={() => onUpdateStatus(appointment.id, 'confirmed')}
              className={`status-button ${
                appointment.status === 'confirmed' ? 'active confirmed' : ''
              }`}
            >
              Confirm
            </button>
            <button
              onClick={() => onUpdateStatus(appointment.id, 'pending')}
              className={`status-button ${
                appointment.status === 'pending' ? 'active pending' : ''
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => onUpdateStatus(appointment.id, 'cancelled')}
              className={`status-button ${
                appointment.status === 'cancelled' ? 'active cancelled' : ''
              }`}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="detail-item">
          <h4>Notes</h4>
          <p className="appointment-notes">
            {appointment.notes || 'No notes available'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;