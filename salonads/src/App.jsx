import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import StaffDashboard from "./Staff/StaffDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

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
        <LoginPage onLogin={handleLogin} />
      ) : user.type === "staff" ? (
        <Routes>
          <Route
            path="/StaffDashboard"
            element={<StaffDashboard user={user} onLogout={handleLogout} />}
          />
          {/* Auto redirect after login */}
          <Route path="*" element={<Navigate to="/StaffDashboard" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/admin"
            element={<AdminDashboard user={user} onLogout={handleLogout} />}
          />
          {/* Auto redirect after login */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;

