// WhatsAppReminderSystem.jsx
import React, { useState, useEffect } from 'react';
import './WhatsAppReminder.css';

const WhatsAppReminder = () => {
  // Sample customer data with service history
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      phone: '+1234567890',
      lastService: '2023-09-15',
      serviceType: 'Hair Color',
      nextReminderDate: '2023-10-15',
      status: 'Scheduled'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      phone: '+1234567891',
      lastService: '2023-09-20',
      serviceType: 'Facial',
      nextReminderDate: '2023-10-20',
      status: 'Scheduled'
    },
    {
      id: 3,
      name: 'Emma Davis',
      phone: '+1234567892',
      lastService: '2023-08-15',
      serviceType: 'Massage',
      nextReminderDate: '2023-09-15',
      status: 'Sent'
    },
    {
      id: 4,
      name: 'James Brown',
      phone: '+1234567893',
      lastService: '2023-08-10',
      serviceType: 'Makeup',
      nextReminderDate: '2023-09-10',
      status: 'Sent'
    }
  ]);

  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    autoSend: true,
    reminderMessage: 'Hi {name}! This is a friendly reminder from Elite Salon. It\'s been a month since your last {service}. We hope you enjoyed our service and would love to see you again soon! Book your next appointment: https://elitesalon.com/book',
    businessName: 'Elite Salon'
  });

  // Simulate checking for reminders that need to be sent
  useEffect(() => {
    const checkReminders = () => {
      const today = new Date().toISOString().split('T')[0];
      const dueReminders = customers.filter(customer => 
        customer.nextReminderDate === today && customer.status === 'Scheduled'
      );
      
      if (dueReminders.length > 0 && settings.autoSend) {
        sendReminders(dueReminders);
      }
    };

    // Check every hour for due reminders
    const interval = setInterval(checkReminders, 60 * 60 * 1000);
    
    // Initial check
    checkReminders();
    
    return () => clearInterval(interval);
  }, [customers, settings.autoSend]);

  // Simulate sending reminders via WhatsApp API
  const sendReminders = async (customersToRemind) => {
    setIsLoading(true);
    
    // Add to logs
    const logEntry = {
      timestamp: new Date().toLocaleString(),
      message: `Sending reminders to ${customersToRemind.length} customers`,
      type: 'info'
    };
    setLogs(prev => [logEntry, ...prev]);
    
    // Simulate API calls
    for (const customer of customersToRemind) {
      try {
        // In a real implementation, this would be an actual API call to WhatsApp Business API
        // For demonstration, we're simulating the API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update customer status
        setCustomers(prev => prev.map(c => 
          c.id === customer.id ? { ...c, status: 'Sent' } : c
        ));
        
        // Add success log
        const successLog = {
          timestamp: new Date().toLocaleString(),
          message: `Reminder sent to ${customer.name} (${customer.phone})`,
          type: 'success'
        };
        setLogs(prev => [successLog, ...prev]);
      } catch (error) {
        // Add error log
        const errorLog = {
          timestamp: new Date().toLocaleString(),
          message: `Failed to send reminder to ${customer.name}: ${error.message}`,
          type: 'error'
        };
        setLogs(prev => [errorLog, ...prev]);
      }
    }
    
    setIsLoading(false);
  };

  // Manually send a reminder
  const sendManualReminder = (customer) => {
    setIsLoading(true);
    
    // Add to logs
    const logEntry = {
      timestamp: new Date().toLocaleString(),
      message: `Manually sending reminder to ${customer.name}`,
      type: 'info'
    };
    setLogs(prev => [logEntry, ...prev]);
    
    // Simulate API call
    setTimeout(() => {
      // Update customer status
      setCustomers(prev => prev.map(c => 
        c.id === customer.id ? { ...c, status: 'Sent' } : c
      ));
      
      // Add success log
      const successLog = {
        timestamp: new Date().toLocaleString(),
        message: `Reminder sent to ${customer.name} (${customer.phone})`,
        type: 'success'
      };
      setLogs(prev => [successLog, ...prev]);
      
      setIsLoading(false);
    }, 1000);
  };

  // Add a new customer
  const addCustomer = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCustomer = {
      id: customers.length + 1,
      name: form.name.value,
      phone: form.phone.value,
      lastService: form.lastService.value,
      serviceType: form.serviceType.value,
      nextReminderDate: calculateNextReminderDate(form.lastService.value),
      status: 'Scheduled'
    };
    
    setCustomers(prev => [...prev, newCustomer]);
    
    // Add to logs
    const logEntry = {
      timestamp: new Date().toLocaleString(),
      message: `Added new customer: ${newCustomer.name}`,
      type: 'info'
    };
    setLogs(prev => [logEntry, ...prev]);
    
    form.reset();
  };

  // Calculate next reminder date (1 month after last service)
  const calculateNextReminderDate = (lastServiceDate) => {
    const date = new Date(lastServiceDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  // Update settings
  const updateSettings = (e) => {
    e.preventDefault();
    const form = e.target;
    const newSettings = {
      autoSend: form.autoSend.checked,
      reminderMessage: form.reminderMessage.value,
      businessName: form.businessName.value
    };
    
    setSettings(newSettings);
    
    // Add to logs
    const logEntry = {
      timestamp: new Date().toLocaleString(),
      message: 'Settings updated successfully',
      type: 'success'
    };
    setLogs(prev => [logEntry, ...prev]);
  };

  return (
    <div className="whatsapp-reminder-system">
      <header className="reminder-header">
        <h1><i className="fab fa-whatsapp"></i> WhatsApp Reminder System</h1>
        <p>Automatically send reminders to customers 1 month after their service</p>
      </header>

      <div className="reminder-container">
        <div className="reminder-content">
          {/* Settings Panel */}
          <div className="settings-panel">
            <h2>System Settings</h2>
            <form onSubmit={updateSettings}>
              <div className="form-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="autoSend" 
                    defaultChecked={settings.autoSend}
                  />
                  Enable Automatic Reminders
                </label>
              </div>
              
              <div className="form-group">
                <label>Business Name</label>
                <input 
                  type="text" 
                  name="businessName" 
                  defaultValue={settings.businessName}
                  placeholder="Your Salon Name"
                />
              </div>
              
              <div className="form-group">
                <label>Reminder Message Template</label>
                <textarea 
                  name="reminderMessage" 
                  defaultValue={settings.reminderMessage}
                  placeholder="WhatsApp message template"
                  rows="4"
                />
                <small>Use {"{name}"} for customer name and {"{service}"} for service type</small>
              </div>
              
              <button type="submit">Save Settings</button>
            </form>
          </div>

          {/* Customer List */}
          <div className="customer-panel">
            <h2>Customer List <span className="badge">{customers.length}</span></h2>
            
            <div className="add-customer-form">
              <h3>Add New Customer</h3>
              <form onSubmit={addCustomer}>
                <div className="form-row">
                  <input type="text" name="name" placeholder="Customer Name" required />
                  <input type="tel" name="phone" placeholder="Phone Number" required />
                </div>
                <div className="form-row">
                  <input type="date" name="lastService" required />
                  <select name="serviceType" required>
                    <option value="">Select Service</option>
                    <option value="Haircut">Haircut</option>
                    <option value="Hair Color">Hair Color</option>
                    <option value="Facial">Facial</option>
                    <option value="Skin Treatment">Skin Treatment</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Massage">Massage</option>
                  </select>
                </div>
                <button type="submit">Add Customer</button>
              </form>
            </div>
            
            <div className="customers-list">
              {customers.map(customer => (
                <div key={customer.id} className="customer-card">
                  <div className="customer-info">
                    <h4>{customer.name}</h4>
                    <p><i className="fas fa-phone"></i> {customer.phone}</p>
                    <p><i className="fas fa-calendar"></i> Last Service: {customer.lastService}</p>
                    <p><i className="fas fa-spa"></i> {customer.serviceType}</p>
                    <p><i className="fas fa-bell"></i> Next Reminder: {customer.nextReminderDate}</p>
                    <span className={`status ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </div>
                  <div className="customer-actions">
                    <button 
                      onClick={() => sendManualReminder(customer)}
                      disabled={customer.status === 'Sent' || isLoading}
                    >
                      Send Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="log-panel">
          <h2>Activity Log</h2>
          <div className="log-entries">
            {logs.length === 0 ? (
              <p className="no-logs">No activity yet. Logs will appear here.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className={`log-entry ${log.type}`}>
                  <span className="log-time">{log.timestamp}</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="integration-guide">
        <h2>API Integration Guide</h2>
        <p>To enable actual WhatsApp messaging, you need to:</p>
        <ol>
          <li>Create a WhatsApp Business Account</li>
          <li>Set up the WhatsApp Business API</li>
          <li>Obtain authentication tokens</li>
          <li>Replace the simulated API calls with actual API requests</li>
        </ol>
        <div className="code-example">
          <pre>
{`// Example API call to WhatsApp
const sendWhatsAppMessage = async (phone, message) => {
  const response = await fetch('https://graph.facebook.com/v13.0/PHONE_NUMBER_ID/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: message }
    })
  });
  return response.json();
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppReminder;