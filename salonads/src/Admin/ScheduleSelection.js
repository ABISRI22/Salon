// src/Admin/ScheduleSection.js
export const staffMembers = [
  { id: 1, username: 'John', password: 'John123', name: 'John', role: 'HairStylist' },
  { id: 2, username: 'David', password: 'David123', name: 'David', role: 'MakeupArtist' },
  { id: 3, username: 'Divya', password: 'Divya123', name: 'Divya', role: 'SkinSpecialist' },
  { id: 4, username: 'Abinaya', password: 'Abinaya123', name: 'Abinaya', role: 'HairStylist' },
  { id: 5, username: 'Aravind', password: 'Aravind123', name: 'Aravind', role: 'MakeupArtist' },
  { id: 6, username: 'Mithra', password: 'Mithra123', name: 'Mithra', role: 'SkinSpecialist' },
  { id: 7, username: 'Savi', password: 'Savi123', name: 'Savi', role: 'HairStylist' },
  { id: 8, username: 'Michael', password: 'Michael123', name: 'Michael', role: 'MassageTherapist' },
  { id: 8, username: 'Harini', password: 'Harini123', name: 'Harini', role: 'MassageTherapist' }
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