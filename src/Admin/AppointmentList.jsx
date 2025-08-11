import React from 'react';
import './AppointmentList.css';

const AppointmentList = ({ appointments, selectedAppointment, onSelectAppointment }) => {
  if (appointments.length === 0) {
    return (
      <div className="empty-appointments">
        No appointments found
      </div>
    );
  }

  return (
    <div className="appointment-list">
      {appointments.map(appt => (
        <div
          key={appt.id}
          className={`appointment-card ${
            selectedAppointment?.id === appt.id ? 'selected' : ''
          }`}
          onClick={() => onSelectAppointment(appt)}
        >
          <div className="appointment-header">
            <h3>{appt.patientName}</h3>
            <span className={`status-badge status-${appt.status}`}>
              {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
            </span>
          </div>
          <p className="appointment-time">
            {appt.date} at {appt.time} ({appt.duration} mins)
          </p>
          <p className="appointment-service">{appt.service}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;