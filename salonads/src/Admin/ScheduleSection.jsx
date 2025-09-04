// src/Admin/ScheduleSection.jsx
import React, { useState, useEffect } from "react";
import './StaffSelection.css'

// Staff data with roles
export const staffMembers = [
  { id: 1, username: 'John', password: 'John123', name: 'John', role: 'HairStylist' },
  { id: 2, username: 'David', password: 'David123', name: 'David', role: 'MakeupArtist' },
  { id: 3, username: 'Divya', password: 'Divya123', name: 'Divya', role: 'SkinSpecialist' },
  { id: 4, username: 'Abinaya', password: 'Abinaya123', name: 'Abinaya', role: 'HairStylist' },
  { id: 5, username: 'Aravind', password: 'Aravind123', name: 'Aravind', role: 'MakeupArtist' },
  { id: 6, username: 'Mithra', password: 'Mithra123', name: 'Mithra', role: 'SkinSpecialist' },
  { id: 7, username: 'Savi', password: 'Savi123', name: 'Savi', role: 'HairStylist' },
  { id: 8, username: 'Michael', password: 'Michael123', name: 'Michael', role: 'MassageTherapist' }
];

// Service categories mapped to staff roles
export const serviceCategories = {
  "Haircut": "HairStylist",
  "Hair Color": "HairStylist",
  "Facial": "SkinSpecialist",
  "Skin Treatment": "SkinSpecialist",
  "Makeup": "MakeupArtist",
  "Massage": "MassageTherapist"
};

// Initial appointment data
export const initialAppointmentData = [
  { id: 1, customer: "Sarah Johnson", service: "Haircut", staff: "John", date: "2023-10-20", time: "10:00 AM", status: "Confirmed" },
  { id: 2, customer: "Mike Wilson", service: "Facial", staff: "Divya", date: "2023-10-20", time: "11:30 AM", status: "Confirmed" },
  { id: 3, customer: "Emma Davis", service: "Massage", staff: "Michael", date: "2023-10-20", time: "2:00 PM", status: "Pending" },
  { id: 4, customer: "James Brown", service: "Makeup", staff: "David", date: "2023-10-21", time: "9:00 AM", status: "Confirmed" },
];

function ScheduleSection() {
  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    customer: "",
    service: "",
    staff: "",
    date: getTodayDate(),
    time: "9:00 AM",
    status: "Pending"
  });
  const [filteredStaff, setFilteredStaff] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('salonAppointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      setAppointments(initialAppointmentData);
      localStorage.setItem('salonAppointments', JSON.stringify(initialAppointmentData));
    }
  }, []);

  // Save to localStorage whenever appointments change
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('salonAppointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  // Filter staff based on selected service
  useEffect(() => {
    if (appointmentForm.service) {
      const requiredRole = serviceCategories[appointmentForm.service];
      const availableStaff = staffMembers.filter(staff => staff.role === requiredRole);
      setFilteredStaff(availableStaff);
      
      // Auto-select first available staff if none selected or current selection is invalid
      if (availableStaff.length > 0 && 
          (!appointmentForm.staff || !availableStaff.some(staff => staff.name === appointmentForm.staff))) {
        setAppointmentForm(prev => ({...prev, staff: availableStaff[0].name}));
      } else if (availableStaff.length === 0) {
        setAppointmentForm(prev => ({...prev, staff: ""}));
      }
    } else {
      setFilteredStaff(staffMembers);
    }
  }, [appointmentForm.service]);

  const filteredAppointments = appointments.filter(
    appointment => appointment.date === selectedDate
  );

  // Edit appointment
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setAppointmentForm({
      customer: appointment.customer,
      service: appointment.service,
      staff: appointment.staff,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status
    });
    setIsModalOpen(true);
  };

  // Save appointment (both add and edit)
  const handleSaveAppointment = () => {
    if (!appointmentForm.customer || !appointmentForm.service || !appointmentForm.date) {
      alert("Please fill in customer, service, and date fields");
      return;
    }

    // Validate staff selection based on service
    if (appointmentForm.service && appointmentForm.staff) {
      const requiredRole = serviceCategories[appointmentForm.service];
      const selectedStaff = staffMembers.find(staff => staff.name === appointmentForm.staff);
      
      if (selectedStaff && selectedStaff.role !== requiredRole) {
        alert(`Invalid staff selection. ${appointmentForm.service} requires a ${requiredRole}`);
        return;
      }
    }

    if (editingAppointment) {
      // Update existing appointment
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === editingAppointment.id
          ? { ...appointment, ...appointmentForm }
          : appointment
      );
      setAppointments(updatedAppointments);
      alert("Appointment updated successfully!");
    } else {
      // Add new appointment
      const newAppointmentObj = {
        id: Date.now(),
        customer: appointmentForm.customer,
        service: appointmentForm.service,
        staff: appointmentForm.staff,
        date: appointmentForm.date,
        time: appointmentForm.time,
        status: appointmentForm.status
      };
      
      const updatedAppointments = [...appointments, newAppointmentObj];
      setAppointments(updatedAppointments);
      alert("Appointment added successfully!");
    }

    // Reset form and close modal
    setAppointmentForm({
      customer: "",
      service: "",
      staff: "",
      date: getTodayDate(),
      time: "9:00 AM",
      status: "Pending"
    });
    setEditingAppointment(null);
    setIsModalOpen(false);
  };

  // Cancel appointment
  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Cancelled" }
          : appointment
      );
      setAppointments(updatedAppointments);
    }
  };

  // Delete appointment
  const handleDelete = (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
      setAppointments(updatedAppointments);
    }
  };

  // Open add appointment modal
  const openAddModal = () => {
    setEditingAppointment(null);
    setAppointmentForm({
      customer: "",
      service: "",
      staff: "",
      date: selectedDate,
      time: "9:00 AM",
      status: "Pending"
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
    setAppointmentForm({
      customer: "",
      service: "",
      staff: "",
      date: getTodayDate(),
      time: "9:00 AM",
      status: "Pending"
    });
  };

  // Reset all appointments
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all appointment data? This cannot be undone.")) {
      localStorage.removeItem('salonAppointments');
      setAppointments(initialAppointmentData);
      localStorage.setItem('salonAppointments', JSON.stringify(initialAppointmentData));
      setSelectedDate(getTodayDate());
    }
  };

  // Available services
  const services = Object.keys(serviceCategories);
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Appointment Schedule</h2>
        <div>
          <button className="reset-btn" onClick={handleResetData} style={{marginRight: '10px'}}>
            Reset Data
          </button>
          <button className="add-btn" onClick={openAddModal}>
            New Appointment
          </button>
        </div>
      </div>

      <div className="date-selector">
        <label htmlFor="date">Select Date: </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="schedule-container">
        <div className="time-slots">
          <h4>Time Slots</h4>
          {timeSlots.map(time => (
            <div key={time} className="time-slot">
              <span>{time}</span>
            </div>
          ))}
        </div>

        <div className="appointments-list">
          <h3>Appointments for {selectedDate}</h3>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-info">
                  <h4>{appointment.customer}</h4>
                  <p><strong>Service:</strong> {appointment.service}</p>
                  <p><strong>Staff:</strong> {appointment.staff}</p>
                  <p><strong>Time:</strong> {appointment.time}</p>
                  <span className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="appointment-actions">
                  <button 
                    className="edit-btn" 
                    onClick={() => handleEdit(appointment)}
                  >
                    Edit
                  </button>
                  <button 
                    className="cancel-btn" 
                    onClick={() => handleCancel(appointment.id)}
                    disabled={appointment.status === "Cancelled"}
                  >
                    {appointment.status === "Cancelled" ? "Cancelled" : "Cancel"}
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No appointments scheduled for this date.</p>
          )}
        </div>
      </div>

      {/* Add/Edit Appointment Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingAppointment ? "Edit Appointment" : "Add New Appointment"}</h3>
              <button 
                className="close-btn" 
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Customer Name:*</label>
                <input
                  type="text"
                  value={appointmentForm.customer}
                  onChange={(e) => setAppointmentForm({...appointmentForm, customer: e.target.value})}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Service:*</label>
                <select
                  value={appointmentForm.service}
                  onChange={(e) => setAppointmentForm({...appointmentForm, service: e.target.value})}
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Staff Member:</label>
                <select
                  value={appointmentForm.staff}
                  onChange={(e) => setAppointmentForm({...appointmentForm, staff: e.target.value})}
                >
                  <option value="">Select staff member</option>
                  {filteredStaff.map(staff => (
                    <option key={staff.id} value={staff.name}>{staff.name} ({staff.role})</option>
                  ))}
                </select>
                {appointmentForm.service && (
                  <small className="staff-role-hint">
                    {serviceCategories[appointmentForm.service]} required for {appointmentForm.service}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label>Date:*</label>
                <input
                  type="date"
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time:*</label>
                <select
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                  required
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  value={appointmentForm.status}
                  onChange={(e) => setAppointmentForm({...appointmentForm, status: e.target.value})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveAppointment}>
                {editingAppointment ? "Update Appointment" : "Save Appointment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleSection;