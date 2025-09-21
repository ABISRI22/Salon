// src/Admin/data/jsonAppointmentStorage.js

const fs = require('fs').promises;
const path = require('path');

const APPOINTMENTS_FILE = path.join(__dirname, 'appointments.json');

// Ensure the appointments file exists
const ensureAppointmentsFile = async () => {
  try {
    await fs.access(APPOINTMENTS_FILE);
  } catch {
    // File doesn't exist, create it
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify([]));
  }
};

// Get all appointments
export const getAllAppointments = async () => {
  try {
    await ensureAppointmentsFile();
    const data = await fs.readFile(APPOINTMENTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading appointments:', error);
    return [];
  }
};

// Save appointment
export const saveAppointment = async (appointment) => {
  try {
    const appointments = await getAllAppointments();
    appointments.push(appointment);
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving appointment:', error);
    return false;
  }
};

// Update an appointment
export const updateAppointment = async (appointmentId, updates) => {
  try {
    const appointments = await getAllAppointments();
    const index = appointments.findIndex(apt => apt.id === appointmentId);
    
    if (index === -1) return false;
    
    appointments[index] = { ...appointments[index], ...updates };
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
    return true;
  } catch (error) {
    console.error('Error updating appointment:', error);
    return false;
  }
};

// Delete an appointment
export const deleteAppointment = async (appointmentId) => {
  try {
    let appointments = await getAllAppointments();
    appointments = appointments.filter(apt => apt.id !== appointmentId);
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return false;
  }
};