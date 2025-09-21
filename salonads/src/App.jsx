import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import StaffDashboard from "./Staff/StaffDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import CustomerAppointments from "./Admin/CustomerAppointments"; // Import the new component

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {!user ? (
        // Show login page if no user is logged in
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/customer-appointments" element={<CustomerAppointments />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : user.type === "staff" ? (
        // Staff routes
        <Routes>
          <Route
            path="/StaffDashboard"
            element={<StaffDashboard user={user} onLogout={handleLogout} />}
          />
          <Route path="/customer-appointments" element={<CustomerAppointments />} />
          <Route path="*" element={<Navigate to="/StaffDashboard" replace />} />
        </Routes>
      ) : (
        // Admin routes
        <Routes>
          <Route
            path="/admin/*"
            element={<AdminDashboard user={user} onLogout={handleLogout} />}
          />
          <Route path="/customer-appointments" element={<CustomerAppointments />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;