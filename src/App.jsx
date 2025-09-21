import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Services from './Customer/Services';
import Skin from './Customer/Skin';
import Aboutus from './Customer/Aboutus';
import Contactus from './Customer/Contactus';
import Navbar from './Customer/Navbar';
import Offers from './Customer/Offers';
import Home from './Customer/Home';
import Footer from './Customer/Footer';
import Login from './Customer/Login';
import Register from './Customer/Register';
import SlotBooking from './Customer/SlotBooking';
import MyAppointments from './Customer/MyAppointments';
import AdminLogin from './Customer/Adminlogin';
import AdminDashboard from './Customer/AdminDashboard';
import WhatsAppReminders from './Customer/WhatsappReminders';
import { getAllAppointments } from './Customer/Appointmentmanger';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Check if user was already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
    
    // Load appointments when component mounts
    const savedAppointments = getAllAppointments();
    setAppointments(savedAppointments);
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  // Function to update appointments
  const updateAppointments = () => {
    const savedAppointments = getAllAppointments();
    setAppointments(savedAppointments);
  };

  // List of public paths that don't require authentication
  const publicPaths = [
    '/Aboutus',
    '/contactus',
    '/login',
    '/register',
    '/admin/login'
  ];

  // Check if current path is public
  const isPublicPath = () => {
    return publicPaths.includes(window.location.pathname);
  };

  return (
    <Router>
      <div className="app-container">
         {/* Show navbar only when logged in as customer or on public pages */}
  {((isLoggedIn && user?.role !== 'admin') || isPublicPath()) && window.location.pathname !== '/login' ? (
  <Navbar onLogout={handleLogout} user={user} isLoggedIn={isLoggedIn} />
) : null}
        
        <main className="main-content">
          <Routes>
            {/* Authentication routes */}
            <Route 
              path="/login" 
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !isLoggedIn ? (
                  <Register onLogin={handleLogin} />
                ) : (
                  user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/" replace />
                )
              } 
            />
            
            {/* Admin routes */}
            <Route 
              path="/admin/login" 
              element={
                !isLoggedIn ? (
                  <AdminLogin onLogin={handleLogin} />
                ) : (
                  user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                isLoggedIn && user?.role === 'admin' ? (
                  <AdminDashboard 
                    user={user} 
                    onLogout={handleLogout} 
                    appointments={appointments} 
                  />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              } 
            />
            <Route 
              path="/admin/reminders" 
              element={
                isLoggedIn && user?.role === 'admin' ? (
                  <WhatsAppReminders />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              } 
            />
            
            {/* Public routes */}
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<Contactus />} />
            
            {/* Protected customer routes - only accessible when logged in as customer */}
            <Route 
              path="/" 
              element={
                isLoggedIn && user?.role !== 'admin' ? <Home /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/Skin" 
              element={
                isLoggedIn && user?.role !== 'admin' ? <Skin /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/Services" 
              element={
                isLoggedIn && user?.role !== 'admin' ? <Services /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/Offers" 
              element={
                isLoggedIn && user?.role !== 'admin' ? <Offers /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/slot-booking" 
              element={
                isLoggedIn && user?.role !== 'admin' ? (
                  <SlotBooking onAppointmentBooked={updateAppointments} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/my-appointments" 
              element={
                isLoggedIn && user?.role !== 'admin' ? (
                  <MyAppointments user={user} appointments={appointments} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* Catch-all route */}
            <Route 
              path="*" 
              element={
                isLoggedIn ? (
                  user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </main>
        
        {/* Show footer only when logged in as customer or on public pages */}
        {(isLoggedIn && user?.role !== 'admin') || isPublicPath() ? <Footer /> : null}
      </div>
    </Router>
  );
}

export default App;