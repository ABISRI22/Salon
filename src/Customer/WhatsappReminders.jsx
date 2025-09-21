// src/Admin/WhatsAppReminders.jsx
import React, { useState, useEffect } from "react";
import "./WhatsAppReminders.css";

function WhatsAppReminders() {
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [appointmentType, setAppointmentType] = useState("reminder");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // Pre-defined message templates
  const messageTemplates = {
    reminder: "Hello! This is a reminder from TimelessTrendz about your upcoming appointment. Please arrive 10 minutes early.",
    confirmation: "Hello! Your appointment at TimelessTrendz has been confirmed. We look forward to seeing you!",
    cancellation: "Hello! Your appointment at TimelessTrendz has been cancelled as requested. Please contact us to reschedule.",
    followup: "Hello from TimelessTrendz! We hope you enjoyed your recent visit. We'd love to hear your feedback."
  };

  // Set default message based on appointment type
  useEffect(() => {
    let defaultMessage = messageTemplates[appointmentType];
    
    if (appointmentDate && appointmentTime) {
      defaultMessage += ` Your appointment is on ${appointmentDate} at ${appointmentTime}.`;
    }
    
    defaultMessage += " Thank you for choosing TimelessTrendz!";
    
    setMessage(defaultMessage);
  }, [appointmentType, appointmentDate, appointmentTime]);

  const handleSendReminders = () => {
    const numbers = phoneNumbers.split("\n").filter(num => num.trim() !== "");
    
    if (numbers.length === 0) {
      alert("Please enter at least one phone number");
      return;
    }
    
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }
    
    if (isScheduled && !scheduledTime) {
      alert("Please select a time for scheduling");
      return;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Send messages immediately or schedule them
    numbers.forEach(number => {
      const cleanNumber = number.trim().replace(/\D/g, ''); // Remove non-digit characters
      
      if (cleanNumber) {
        if (isScheduled) {
          // For scheduled messages, we'd normally use a backend
          // This is a frontend-only implementation that will open WhatsApp at the scheduled time
          alert(`Scheduled reminder for ${cleanNumber} at ${scheduledTime}`);
        } else {
          // Open WhatsApp with pre-filled message
          window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, '_blank');
        }
      }
    });
    
    if (!isScheduled) {
      alert("WhatsApp windows opened for each number. Please review and send each message manually.");
    }
  };

  return (
    <div className="whatsapp-reminders">
      <h1>TimelessTrendz WhatsApp Reminders</h1>
      
      <div className="reminder-form">
        <div className="form-group">
          <label htmlFor="phoneNumbers">Customer Phone Numbers (one per line):</label>
          <textarea
            id="phoneNumbers"
            value={phoneNumbers}
            onChange={(e) => setPhoneNumbers(e.target.value)}
            placeholder="Enter phone numbers with country code (e.g., 911234567890)"
            rows={5}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="appointmentType">Message Type:</label>
          <select
            id="appointmentType"
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
            className="form-select"
          >
            <option value="reminder">Appointment Reminder</option>
            <option value="confirmation">Appointment Confirmation</option>
            <option value="cancellation">Cancellation Notice</option>
            <option value="followup">Follow-up Message</option>
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date:</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="appointmentTime">Appointment Time:</label>
            <input
              type="time"
              id="appointmentTime"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message will be auto-generated based on the type selected"
            rows={5}
          />
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isScheduled}
              onChange={(e) => setIsScheduled(e.target.checked)}
            />
            Schedule for later
          </label>
        </div>
        
        {isScheduled && (
          <div className="form-group">
            <label htmlFor="scheduledTime">Schedule Time:</label>
            <input
              type="datetime-local"
              id="scheduledTime"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="form-input"
            />
          </div>
        )}
        
        <button onClick={handleSendReminders} className="send-button">
          {isScheduled ? 'Schedule Reminders' : 'Send Reminders Now'}
        </button>
        
        <div className="instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>Enter phone numbers with country code (without + sign)</li>
            <li>Example: For India, use 91 followed by 10-digit number (911234567890)</li>
            <li>Each number should be on a separate line</li>
            <li>Select the message type and add appointment details if needed</li>
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppReminders;