import React from 'react';
import './DashboardView.css';
import AppointmentList from './AppointmentList';
import AppointmentDetails from './AppointmentDetails';
import StatusFilter from './StatusFilter';

const DashboardView = ({
  currentUser,
  onLogout,
  appointments,
  selectedAppointment,
  onSelectAppointment,
  onUpdateStatus,
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  onAddAppointment,
  children
}) => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-container">
           
            <h1>Staff Appointment Portal</h1>
          </div>
          <div className="user-info">
            <span>{currentUser.name} ({currentUser.role})</span>
            <button onClick={onLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          <div className="appointments-section">
            <div className="appointments-header">
              <h2>Your Appointments</h2>
              <div className="appointments-controls">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="search-input"
                />
                <button onClick={onAddAppointment} className="add-button">
                  + New Appointment
                </button>
              </div>
            </div>
            <StatusFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
            <AppointmentList 
              appointments={appointments} 
              selectedAppointment={selectedAppointment}
              onSelectAppointment={onSelectAppointment}
            />
          </div>
          <div className="details-section">
            <AppointmentDetails 
              appointment={selectedAppointment}
              onUpdateStatus={onUpdateStatus}
            />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardView;