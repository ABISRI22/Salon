import { useState } from 'react';

// Mock data
const staffMembers = [
  { id: 1, username: 'Abisri', password: 'password123', name: 'Abisri', role: 'Hairstylist' },
  { id: 2, username: 'bhavana', password: 'password123', name: 'Bhavana', role: 'Makeup Artist' }
];

const initialAppointments = [
  { 
    id: 1, 
    patientName: 'Michael Brown', 
    date: '2023-08-15', 
    time: '09:00', 
    duration: 30, 
    service: 'haircut', 
    staffId: 1, 
    status: 'confirmed',
    notes: 'Marriage' 
  },
  { 
    id: 2, 
    patientName: 'Johnson', 
    date: '2023-08-15', 
    time: '10:30', 
    duration: 60, 
    service: 'Consultation', 
    staffId: 1, 
    status: 'confirmed',
    notes: '' 
  },
  { 
    id: 3, 
    patientName: 'Arati', 
    date: '2023-08-16', 
    time: '14:00', 
    duration: 15, 
    service: 'Makeup', 
    staffId: 2, 
    status: 'pending',
    notes: 'College' 
  },
  { 
    id: 4, 
    patientName: 'Wilson', 
    date: '2023-08-16', 
    time: '11:00', 
    duration: 30, 
    service: 'Haircut', 
    staffId: 2, 
    status: 'pending',
    notes: 'Office' 
  }
];

const useAppLogic = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [activeFilter, setActiveFilter] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const filteredAppointments = appointments.filter(appt => {
    const matchesUser = currentUser ? appt.staffId === currentUser.id : true;
    const matchesSearch = searchTerm === '' || 
      appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      appt.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'today') {
      return matchesUser && matchesSearch && appt.date === today;
    } else if (activeFilter === 'upcoming') {
      return matchesUser && matchesSearch && appt.date >= today;
    } else if (activeFilter === 'all') {
      return matchesUser && matchesSearch;
    }
    return matchesUser && matchesSearch && appt.status === activeFilter;
  });

  const handleLogin = (username, password) => {
    const user = staffMembers.find(user => 
      user.username === username && user.password === password
    );
    
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedAppointment(null);
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    setAppointments(appointments.map(appt => 
      appt.id === appointmentId ? {...appt, status: newStatus} : appt
    ));
    setSelectedAppointment(prev => prev?.id === appointmentId ? {...prev, status: newStatus} : prev);
  };

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  return {
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
  };
};

export default useAppLogic;