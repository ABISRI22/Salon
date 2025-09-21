// src/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard({ user, onLogout, appointments = [] }) {
  const navigate = useNavigate();
  const [selectedViewDate, setSelectedViewDate] = useState(new Date().toLocaleDateString('en-CA'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    navigate("/");
  };

  // Filter appointments by selected date
  const filteredAppointments = appointments
    .filter(apt => apt.date === selectedViewDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  // Calculate statistics
  const totalAppointments = appointments.length;
  const todayAppointments = appointments.filter(apt => apt.date === new Date().toLocaleDateString('en-CA')).length;
  const revenue = appointments.reduce((total, apt) => {
    const servicePrice = apt.servicePrice || 0;
    return total + servicePrice;
  }, 0);
  
  // Get unique staff members (simplified)
  const staffOnline = 3; // This would normally come from your backend

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="admin-content">
        <div className="admin-card">
          <h2>Dashboard Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Appointments</h3>
              <p>{totalAppointments}</p>
            </div>
            <div className="stat-card">
              <h3>Today's Appointments</h3>
              <p>{todayAppointments}</p>
            </div>
            <div className="stat-card">
              <h3>Revenue</h3>
              <p>${revenue.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Staff Online</h3>
              <p>{staffOnline}/5</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn" onClick={() => navigate('/admin/appointments')}>
              Manage Appointments
            </button>
            <button className="action-btn" onClick={() => navigate('/admin/customers')}>
              View Customers
            </button>
            <button className="action-btn" onClick={() => navigate('/admin/reminders')}>
              Send WhatsApp Reminders
            </button>
            <button className="action-btn">
              Staff Management
            </button>
            <button className="action-btn">
              Reports
            </button>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="appointments-header">
            <h2>Today's Appointments</h2>
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
          </div>
          
          {filteredAppointments.length === 0 ? (
            <div className="no-appointments">
              <p>No appointments scheduled for {selectedViewDate}.</p>
            </div>
          ) : (
            <div className="appointments-list">
              {filteredAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-details">
                    <h3>{appointment.serviceName}</h3>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Customer:</strong> {appointment.customerName}</p>
                    <p><strong>Staff:</strong> {appointment.staff}</p>
                    <p className={`status ${appointment.status}`}>{appointment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="admin-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {appointments.slice(-3).reverse().map(appointment => (
              <div key={appointment.id} className="activity-item">
                <span className="activity-time">
                  {new Date(appointment.bookedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
                <span className="activity-text">
                  New appointment: {appointment.customerName} booked {appointment.serviceName}
                </span>
              </div>
            ))}
            {appointments.length === 0 && (
              <div className="activity-item">
                <span className="activity-text">No recent activity</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;