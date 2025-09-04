// src/Admin/AdminDashboard.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import CustomerSection from "./CustomerSelection";  // Changed to match your actual file
import StaffSection from "./StaffSelection";        // Changed to match your actual file
import ScheduleSection from "./ScheduleSection";  // Changed to match your actual file
import "./AdminDashboard.css";

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <div className="dashboard">
      {/* Navbar */}
      <Navbar onLogout={onLogout} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Content Section */}
      <div className="dashboard-content">
        {activeTab === "customer" && <CustomerSection />}
        {activeTab === "staff" && <StaffSection />}
        {activeTab === "schedule" && <ScheduleSection />}
      </div>
    </div>
  );
}

export default AdminDashboard;