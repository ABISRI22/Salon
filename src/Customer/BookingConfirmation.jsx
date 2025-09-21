import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const { branch, service, date, time } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-check text-green-500 text-3xl"></i>
        </div>
        
        <h1 className="text-3xl font-bold text-green-700 mb-4">Booking Confirmed!</h1>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
          <div className="space-y-3">
            <p><span className="font-medium">Service:</span> {service}</p>
            <p><span className="font-medium">Branch:</span> {branch}</p>
            <p><span className="font-medium">Date:</span> {date}</p>
            <p><span className="font-medium">Time:</span> {time}</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          We've sent a confirmation email with your appointment details. 
          Please arrive 10 minutes before your scheduled time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/book-appointment" 
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Book Another Appointment
          </Link>
          <Link 
            to="/" 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;