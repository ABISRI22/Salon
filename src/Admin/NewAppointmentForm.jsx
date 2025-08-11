import React, { useState } from 'react';
import './NewAppointmentForm.css';

const NewAppointmentForm = ({ staffId, onAddAppointment, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
    duration: 30,
    service: '',
    notes: '',
    status: 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      ...formData,
      id: Date.now(), // Temporary ID
      staffId: staffId
    };
    onAddAppointment(newAppointment);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Appointment</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Client Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Duration (minutes)</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
              </select>
            </div>
            <div className="form-group">
              <label>Service</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentForm;