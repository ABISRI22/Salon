import { useState } from 'react'
import Services from './Customer/Services'
import Skin from './Customer/Skin'
import Aboutus from './Customer/Aboutus'
import Contactus from './Customer/Contactus'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Customer/Navbar';
import Offers from './Customer/Offers'
import Home from './Customer/Home'
import Footer from './Customer/Footer';
import AppointmentPortal from './Admin/AppointmentPortal'; // Import the new component
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';




function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/Skin" element={<Skin />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/Offers" element={<Offers />} />
          
            <Route path="/appointments" element={<AppointmentPortal />} /> {/* New route */}
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App 