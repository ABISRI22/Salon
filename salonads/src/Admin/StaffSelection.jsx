// src/Admin/StaffSection.jsx
import React, { useState, useEffect } from "react";

const initialStaffData = [
  { id: 1, name: "John", role: "Hair Stylist", email: "john@example.com", phone: "9876543210", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "David", role: "Makeup Artist", email: "david@example.com", phone: "9876543211", photo: "https://randomuser.me/api/portraits/men/47.jpg" },
  { id: 3, name: "Michael", role: "Massage Therapist", email: "michael@example.com", phone: "9876543212", photo: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 4, name: "Divya", role: "Skin Specialist", email: "divya@example.com", phone: "9876543213", photo: "https://randomuser.me/api/portraits/women/46.jpg" },
  { id: 5, name: "Abinaya", role: "Hair Stylist", email: "abhinaya@example.com", phone: "9876543214", photo: "https://randomuser.me/api/portraits/women/44.jpg" }
];

function StaffSelection() {
  const [staff, setStaff] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", email: "", phone: "", photo: "" });
  const [roleFilter, setRoleFilter] = useState("All");

  // Load staff from localStorage
  useEffect(() => {
    const savedStaff = localStorage.getItem("salonStaff");
    if (savedStaff) {
      setStaff(JSON.parse(savedStaff));
    } else {
      setStaff(initialStaffData);
      localStorage.setItem("salonStaff", JSON.stringify(initialStaffData));
    }
  }, []);

  // Save staff changes to localStorage
  useEffect(() => {
    if (staff.length > 0) {
      localStorage.setItem("salonStaff", JSON.stringify(staff));
    }
  }, [staff]);

  // Group staff by role
  const groupStaffByRole = () => {
    const grouped = {};
    
    staff.forEach((staffMember) => {
      if (roleFilter !== "All" && staffMember.role !== roleFilter) {
        return;
      }
      
      if (!grouped[staffMember.role]) {
        grouped[staffMember.role] = [];
      }
      grouped[staffMember.role].push(staffMember);
    });
    
    return grouped;
  };

  const groupedStaff = groupStaffByRole();
  const roles = [...new Set(staff.map(member => member.role))];

  const handleDelete = (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      const updatedStaff = staff.filter((member) => member.id !== staffId);
      setStaff(updatedStaff);
    }
  };

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember);
    setFormData(staffMember);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingStaff(null);
    setFormData({ name: "", role: "", email: "", phone: "", photo: "" });
    setIsFormOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingStaff) {
      // Update existing staff
      const updatedStaff = staff.map((member) =>
        member.id === editingStaff.id ? { ...editingStaff, ...formData } : member
      );
      setStaff(updatedStaff);
    } else {
      // Add new staff
      const newStaff = {
        id: Date.now(),
        ...formData,
        photo: formData.photo || "https://via.placeholder.com/150", // fallback photo
      };
      setStaff([...staff, newStaff]);
    }

    setIsFormOpen(false);
    setFormData({ name: "", role: "", email: "", phone: "", photo: "" });
    setEditingStaff(null);
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Staff Management</h2>
        <div>
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="role-filter"
          >
            <option value="All">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button className="add-btn" onClick={handleAddNew}>Add New Staff</button>
        </div>
      </div>

      {/* Staff Form */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingStaff ? "Edit Staff" : "Add New Staff"}</h3>
              <button className="close-btn" onClick={() => setIsFormOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit} className="staff-form">
                <div className="form-group">
                  <label>Name:*</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role:*</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Hair Stylist">Hair Stylist</option>
                    <option value="Makeup Artist">Makeup Artist</option>
                    <option value="Massage Therapist">Massage Therapist</option>
                    <option value="Skin Specialist">Skin Specialist</option>
                    <option value="Nail Technician">Nail Technician</option>
                    <option value="Receptionist">Receptionist</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email:*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone:*</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Photo URL:</label>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    value={formData.photo}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setIsFormOpen(false)}>Cancel</button>
                  <button type="submit" className="save-btn">{editingStaff ? "Update Staff" : "Add Staff"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Staff List Grouped by Role */}
      <div className="staff-groups">
        {Object.keys(groupedStaff).length === 0 ? (
          <p>No staff members found{roleFilter !== "All" ? ` for ${roleFilter}` : ""}.</p>
        ) : (
          Object.entries(groupedStaff).map(([role, staffMembers]) => (
            <div key={role} className="staff-group">
              <h3 className="group-title">{role} ({staffMembers.length})</h3>
              <div className="staff-grid">
                {staffMembers.map((staffMember) => (
                  <div key={staffMember.id} className="staff-card">
                    <img src={staffMember.photo} alt={staffMember.name} />
                    <h3>{staffMember.name}</h3>
                    <p className="staff-role">{staffMember.role}</p>
                    <div className="staff-details">
                      <p><strong>Email:</strong> {staffMember.email}</p>
                      <p><strong>Phone:</strong> {staffMember.phone}</p>
                    </div>
                    <div className="staff-actions">
                      <button className="edit-btn" onClick={() => handleEdit(staffMember)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(staffMember.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StaffSelection;