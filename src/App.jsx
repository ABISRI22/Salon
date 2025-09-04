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
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user was already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
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

  return (
    <Router>
      <div className="app-container">
        {/* Show navbar only when logged in or on public pages */}
        {(isLoggedIn || window.location.pathname === '/Aboutus' || 
          window.location.pathname === '/contactus' || 
          window.location.pathname === '/login' ||
          window.location.pathname === '/register') && 
          <Navbar onLogout={handleLogout} user={user} isLoggedIn={isLoggedIn} />}
        
        <main className="main-content">
          <Routes>
            {/* Authentication routes */}
            <Route 
              path="/login" 
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !isLoggedIn ? (
                  <Register onLogin={handleLogin} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            
            {/* Public routes */}
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/contactus" element={<Contactus />} />
            
            {/* Protected routes - only accessible when logged in */}
            <Route 
              path="/" 
              element={
                isLoggedIn ? <Home /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/Skin" 
              element={
                isLoggedIn ? <Skin /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/Services" 
              element={
                isLoggedIn ? <Services /> : <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/Offers" 
              element={
                isLoggedIn ? <Offers /> : <Navigate to="/login" replace />
              } 
            />
            
            {/* Catch-all route */}
            <Route 
              path="*" 
              element={
                isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </main>
        
        {/* Show footer only when logged in or on public pages */}
        {(isLoggedIn || window.location.pathname === '/Aboutus' || 
          window.location.pathname === '/contactus' ||
          window.location.pathname === '/login' ||
          window.location.pathname === '/register') && <Footer />}
      </div>
    </Router>
  );
}

export default App;