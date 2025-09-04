// src/Staff/StaffDashboard.jsx
import React, { useState, useEffect } from "react";
import "./StaffDashboard.css";
import { staffMembers } from "../Admin/ScheduleSection";

// Main App component
function StaffDashboard() {
    const [currentUser, setCurrentUser] = useState(null);
    const [view, setView] = useState("login");
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [activeFilter, setActiveFilter] = useState("today");
    const [searchTerm, setSearchTerm] = useState("");

    // Load appointments from localStorage
    useEffect(() => {
        const savedAppointments = localStorage.getItem("salonAppointments");
        if (savedAppointments) {
            setAppointments(JSON.parse(savedAppointments));
        }
    }, []);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const today = getTodayDate();

    // Get all staff members with the same role as current user
    const getStaffInSameRole = () => {
        if (!currentUser) return [];
        return staffMembers.filter(staff => staff.role === currentUser.role);
    };

    // Filter appointments based on view, search, and role
    const filteredAppointments = appointments.filter((appt) => {
        const sameRoleStaff = getStaffInSameRole();
        const matchesRole = sameRoleStaff.some(staff => staff.name === appt.staff);
        const matchesSearch =
            searchTerm === "" ||
            appt.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appt.service.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeFilter === "today") {
            return matchesRole && matchesSearch && appt.date === today;
        } else if (activeFilter === "upcoming") {
            return matchesRole && matchesSearch && appt.date >= today;
        } else if (activeFilter === "all") {
            return matchesRole && matchesSearch;
        }
        return (
            matchesRole &&
            matchesSearch &&
            appt.status.toLowerCase() === activeFilter
        );
    });

    // Group appointments by staff member within the same role
    const appointmentsByStaff = getStaffInSameRole().map(staff => {
        const staffAppointments = appointments.filter(
            appt => appt.staff === staff.name
        );
        
        return {
            staff: staff.name,
            appointments: staffAppointments,
            role: staff.role
        };
    });

    // Login handler
    const handleLogin = (username, password, role) => {
        const user = staffMembers.find(
            (user) => 
                user.username === username && 
                user.password === password &&
                user.role === role
        );

        if (user) {
            setCurrentUser(user);
            setView("dashboard");
            return true;
        }
        return false;
    };

    // Logout handler
    const handleLogout = () => {
        setCurrentUser(null);
        setView("login");
        setSelectedAppointment(null);
    };

    // Update appointment status
    const updateAppointmentStatus = (appointmentId, newStatus) => {
        const updatedAppointments = appointments.map((appt) =>
            appt.id === appointmentId ? { ...appt, status: newStatus } : appt
        );
        setAppointments(updatedAppointments);
        localStorage.setItem("salonAppointments", JSON.stringify(updatedAppointments));

        if (selectedAppointment && selectedAppointment.id === appointmentId) {
            setSelectedAppointment({ ...selectedAppointment, status: newStatus });
        }
    };

    // Render appropriate view based on current state
    if (view === "login") {
        return <LoginView onLogin={handleLogin} />;
    } else {
        return (
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
                appointmentsByStaff={appointmentsByStaff}
            />
        );
    }
}

// Login View component (unchanged)
function LoginView({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState(null);
    
    // Get unique roles from staffMembers
    const roles = [...new Set(staffMembers.map(staff => staff.role))];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onLogin(username, password, role)) {
            setError(null);
        } else {
            setError("Invalid username, password, or role selection");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img
                        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP"
                        alt="Clinic logo"
                        className="login-logo"
                    />
                    <h2 className="login-title">Staff Login</h2>
                    <p className="login-subtitle">Access your appointment dashboard</p>
                </div>
                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role" className="form-label">
                            Designation
                        </label>
                        <select
                            id="role"
                            name="role"
                            required
                            className="form-input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select your role</option>
                            {roles.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>
                                    {roleOption}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="login-button">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}

// Dashboard View component with role-based view
function DashboardView({
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
    appointmentsByStaff,
}) {
    return (
        <div className="dashboard">
            <header className="header">
                <div className="header-content">
                    <div className="header-brand">
                        <img
                            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP"
                            alt="Clinic logo"
                            className="header-logo"
                        />
                        <h1 className="header-title">Staff Appointment Portal</h1>
                    </div>
                    <div className="header-user">
                        <span className="user-info">
                            {currentUser.name} ({currentUser.role})
                        </span>
                        <button onClick={onLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="dashboard-grid">
                    {/* Left column - Appointment list */}
                    <div className="appointment-list">
                        <div className="card">
                            <div className="card-header">
                                <h2 className="card-title">
                                    {currentUser.role} Team Appointments
                                </h2>
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Search appointments..."
                                        className="search-input"
                                        value={searchTerm}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="filter-buttons">
                                {["today", "upcoming", "confirmed", "pending", "cancelled", "all"].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => onFilterChange(filter)}
                                        className={`filter-button ${activeFilter === filter ? "active" : ""}`}
                                    >
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <div className="appointments-container">
                                {appointments.length === 0 ? (
                                    <div className="empty-state">No appointments found</div>
                                ) : (
                                    appointments.map((appt) => (
                                        <div
                                            key={appt.id}
                                            className={`appointment-item ${
                                                selectedAppointment?.id === appt.id ? "selected" : ""
                                            }`}
                                            onClick={() => onSelectAppointment(appt)}
                                        >
                                            <div className="appointment-header">
                                                <div className="appointment-info">
                                                    <h3 className="patient-name">{appt.customer}</h3>
                                                    <p className="appointment-time">
                                                        {appt.date} at {appt.time}
                                                    </p>
                                                    <p className="appointment-staff">
                                                        Staff: {appt.staff}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`status-badge status-${appt.status.toLowerCase()}`}
                                                >
                                                    {appt.status}
                                                </span>
                                            </div>
                                            <p className="appointment-service">{appt.service}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right column - Appointment details */}
                    <div className="appointment-details">
                        {selectedAppointment ? (
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Appointment Details</h3>
                                </div>
                                <div className="card-content">
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <h4 className="detail-label">Customer</h4>
                                            <p className="detail-value">{selectedAppointment.customer}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4 className="detail-label">Date</h4>
                                            <p className="detail-value">{selectedAppointment.date}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4 className="detail-label">Time</h4>
                                            <p className="detail-value">{selectedAppointment.time}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4 className="detail-label">Service</h4>
                                            <p className="detail-value">{selectedAppointment.service}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4 className="detail-label">Assigned Staff</h4>
                                            <p className="detail-value">{selectedAppointment.staff}</p>
                                        </div>
                                        <div className="detail-item">
                                            <h4 className="detail-label">Status</h4>
                                            <div className="status-actions">
                                                {["Confirmed", "Pending", "Cancelled", "Completed"].map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() =>
                                                            onUpdateStatus(selectedAppointment.id, status)
                                                        }
                                                        className={`status-button ${
                                                            selectedAppointment.status === status ? "active" : ""
                                                        }`}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="card empty-details">
                                <img
                                    src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP"
                                    alt="No appointment selected"
                                    className="header-logo"
                                />
                                <h3 className="empty-title">No appointment selected</h3>
                                <p className="empty-message">
                                    Select an appointment from the list to view details
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Staff Workload View - Show all staff in the same role */}
                <div className="staff-workload-section">
                    <h2>{currentUser.role} Team Workload</h2>
                    <div className="staff-workload-grid">
                        {appointmentsByStaff.map((staffData, index) => (
                            <div key={index} className="staff-workload-card">
                                <div className="staff-header">
                                    <h3 className="staff-name">{staffData.staff}</h3>
                                    <span className="appointment-count">
                                        {staffData.appointments.length} appointment(s)
                                    </span>
                                </div>
                                <div className="staff-appointments">
                                    {staffData.appointments.slice(0, 5).map((appt) => (
                                        <div key={appt.id} className="workload-appointment">
                                            <div className="workload-info">
                                                <span className="workload-customer">{appt.customer}</span>
                                                <span className="workload-service">{appt.service}</span>
                                            </div>
                                            <div className="workload-details">
                                                <span className="workload-time">{appt.time}</span>
                                                <span className={`workload-status ${appt.status.toLowerCase()}`}>
                                                    {appt.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {staffData.appointments.length > 5 && (
                                        <div className="more-appointments">
                                            +{staffData.appointments.length - 5} more appointments
                                        </div>
                                    )}
                                    {staffData.appointments.length === 0 && (
                                        <div className="no-appointments">
                                            No appointments scheduled
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default StaffDashboard;