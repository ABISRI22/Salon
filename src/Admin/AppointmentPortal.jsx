import React from 'react';
import LoginView from './Login';
import DashboardView from './DashboardView';
import NewAppointmentForm from './NewAppointmentForm';
import useAppLogic from './App';
import './AppointmentPortal.css';

const AppointmentPortal = () => {
  const {
    currentUser,
    filteredAppointments,
    selectedAppointment,
    activeFilter,
    searchTerm,
    showNewAppointmentForm,
    handleLogin,
    handleLogout,
    setSelectedAppointment,
    updateAppointmentStatus,
    setActiveFilter,
    setSearchTerm,
    setShowNewAppointmentForm,
    handleAddAppointment
  } = useAppLogic();

  return (
    <div className="appointment-portal">
      {!currentUser ? (
        <LoginView onLogin={handleLogin} />
      ) : (
        <DashboardView
          currentUser={currentUser}
          onLogout={handleLogout}
          appointments={filteredAppointments}
          selectedAppointment={selectedAppointment}
          onSelectAppointment={setSelectedAppointment}
          onUpdateStatus={updateAppointmentStatus}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddAppointment={() => setShowNewAppointmentForm(true)}
        >
          {showNewAppointmentForm && (
            <NewAppointmentForm
              staffId={currentUser.id}
              onAddAppointment={handleAddAppointment}
              onClose={() => setShowNewAppointmentForm(false)}
            />
          )}
        </DashboardView>
      )}
    </div>
  );
};

export default AppointmentPortal;