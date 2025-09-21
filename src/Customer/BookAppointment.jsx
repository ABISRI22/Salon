import React, { useState } from 'react';
import SlotBooking from './SlotBooking';

const BookAppointment = () => {
  const branches = [
    { name: "Downtown Branch", mapUrl: "https://maps.google.com/?q=123+Main+St" },
    { name: "Westside Branch", mapUrl: "https://maps.google.com/?q=456+Oak+Ave" },
    { name: "Uptown Branch", mapUrl: "https://maps.google.com/?q=789+Elm+St" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
          Book Your Appointment
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Select your preferred branch, service, date, and time
        </p>
        <div className="flex justify-center">
          <SlotBooking branches={branches} />
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;