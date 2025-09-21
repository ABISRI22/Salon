// src/Admin/AdminDashboard.jsx (updated)
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CustomerSection from "./CustomerSelection";
import StaffSection from "./StaffSelection";
import ScheduleSection from "./ScheduleSection";
import "./AdminDashboard.css";

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("schedule");
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load appointments from localStorage
  useEffect(() => {
    const savedAppointments = localStorage.getItem('admin-appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, [activeTab]);

  // Filter appointments for the selected date
  const dateAppointments = appointments
    .filter(apt => apt.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Function to reset all data
  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      localStorage.removeItem('admin-appointments');
      setAppointments([]);
      alert("All data has been reset.");
    }
  };

  // Function to open customer appointments in a new tab
  const openCustomerAppointments = () => {
    window.open('/customer-appointments', '_blank');
  };

  return (
    <div className="dashboard">
      <Navbar onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="dashboard-content">
        {activeTab === "customer" && <CustomerSection />}
        {activeTab === "staff" && <StaffSection />}
        {activeTab === "schedule" && <ScheduleSection />}
        
        {activeTab === "schedule" && (
          <div className="appointments-section">
            <div className="section-header">
              <h2>Appointment Schedule</h2>
              <div className="header-actions">
                <button className="view-customer-btn" onClick={openCustomerAppointments}>
                  View Customer Site
                </button>
                <button className="reset-btn" onClick={resetData}>
                  Reset Data
                </button>
              </div>
            </div>
            
            <div className="date-selector">
              <label htmlFor="schedule-date">Select Date: </label>
              <input
                type="date"
                id="schedule-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <h3>Appointments for {selectedDate}</h3>
            
            {dateAppointments.length === 0 ? (
              <p>No appointments scheduled for this date.</p>
            ) : (
              <div className="appointments-list">
                {dateAppointments.map(appointment => (
                  <div key={appointment.id} className="appointment-item">
                    <div className="appointment-details">
                      <h4>{appointment.serviceName}</h4>
                      <p><strong>Time:</strong> {appointment.time}</p>
                      <p><strong>Customer:</strong> {appointment.customerName}</p>
                      <p><strong>Staff:</strong> {appointment.staff}</p>
                      <p><strong>Source:</strong> {appointment.source === 'online' ? 'Online' : 'In-Person'}</p>
                      <p><strong>Contact:</strong> {appointment.customerPhone || appointment.customerEmail}</p>
                    </div>
                    <div className="appointment-actions">
                      <span className={`status-badge ${appointment.status}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;