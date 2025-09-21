// src/utils/appointmentsManager.js

// Get all appointments from localStorage
export const getAllAppointments = () => {
  try {
    const appointments = localStorage.getItem('salonAppointments');
    return appointments ? JSON.parse(appointments) : [];
  } catch (error) {
    console.error('Error getting appointments:', error);
    return [];
  }
};

// Save an appointment to localStorage
export const saveAppointment = (appointment) => {
  try {
    const appointments = getAllAppointments();
    appointments.push(appointment);
    localStorage.setItem('salonAppointments', JSON.stringify(appointments));
    return true;
  } catch (error) {
    console.error('Error saving appointment:', error);
    return false;
  }
};

// Delete an appointment from localStorage
export const deleteAppointment = (appointmentId) => {
  try {
    const appointments = getAllAppointments();
    const filteredAppointments = appointments.filter(apt => apt.id !== appointmentId);
    localStorage.setItem('salonAppointments', JSON.stringify(filteredAppointments));
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return false;
  }
};

// Get appointments for a specific user
export const getUserAppointments = (userEmail) => {
  try {
    const appointments = getAllAppointments();
    return appointments.filter(apt => apt.customerEmail === userEmail);
  } catch (error) {
    console.error('Error getting user appointments:', error);
    return [];
  }
};