// src/Admin/CustomerSection.jsx
import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import './CustomerSelection.css'

// Initial data
const initialCustomerData = [
  { id: 1, name: "Sara", gmail: "sara@example.com", phone: "9876543215", visits: 12, lastVisit: "2025-03-15" },
  { id: 2, name: "Charvi", gmail: "charvi@example.com", phone: "9876543216", visits: 8, lastVisit: "2023-08-10" },
  { id: 3, name: "Faizal", gmail: "faizal@example.com", phone: "9876543217", visits: 15, lastVisit: "2023-07-18" },
  { id: 4, name: "James", gmail: "james@example.com", phone: "9876543218", visits: 5, lastVisit: "2023-04-05" },
];

// Function to migrate old data from email to gmail field
const migrateCustomerData = (customers) => {
  return customers.map(customer => {
    // If customer has email field but no gmail field, migrate it
    if (customer.email && !customer.gmail) {
      return {
        ...customer,
        gmail: customer.email,
        email: undefined // Remove the old field
      };
    }
    return customer;
  });
};

function CustomerSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    gmail: "",
    phone: "",
    visits: 0,
    lastVisit: ""
  });
  const [importData, setImportData] = useState([]);
  const [importStatus, setImportStatus] = useState({ success: 0, errors: 0, messages: [] });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCustomers = localStorage.getItem('salonCustomers');
    if (savedCustomers) {
      try {
        const parsedCustomers = JSON.parse(savedCustomers);
        // Migrate old data from email to gmail field
        const migratedCustomers = migrateCustomerData(parsedCustomers);
        setCustomers(migratedCustomers);
        
        // Save migrated data back to localStorage
        localStorage.setItem('salonCustomers', JSON.stringify(migratedCustomers));
      } catch (error) {
        console.error("Error parsing customer data:", error);
        // If parsing fails, use initial data
        setCustomers(initialCustomerData);
        localStorage.setItem('salonCustomers', JSON.stringify(initialCustomerData));
      }
    } else {
      // If no data in localStorage, use initial data and save it
      setCustomers(initialCustomerData);
      localStorage.setItem('salonCustomers', JSON.stringify(initialCustomerData));
    }
  }, []);

  // Save to localStorage whenever customers change
  useEffect(() => {
    if (customers.length > 0) {
      localStorage.setItem('salonCustomers', JSON.stringify(customers));
    }
  }, [customers]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.gmail && customer.gmail.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Edit customer function
  const handleEdit = (customer) => {
    setEditingCustomer({...customer});
    setIsEditModalOpen(true);
  };

  // Save edited customer
  const handleSaveEdit = () => {
    if (editingCustomer.name && editingCustomer.gmail) {
      const updatedCustomers = customers.map(customer => 
        customer.id === editingCustomer.id ? editingCustomer : customer
      );
      setCustomers(updatedCustomers);
      setIsEditModalOpen(false);
      setEditingCustomer(null);
      alert("Customer updated successfully!");
    } else {
      alert("Please fill in at least name and Gmail fields");
    }
  };

  // View customer details
  const handleView = (customer) => {
    console.log("Viewing customer:", customer);
    alert(`Customer Details:\nName: ${customer.name}\nGmail: ${customer.gmail}\nPhone: ${customer.phone}\nVisits: ${customer.visits}\nLast Visit: ${customer.lastVisit}`);
  };

  // Delete customer
  const handleDelete = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
    }
  };

  // Add new customer
  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.gmail) {
      const newCustomerObj = {
        id: Date.now(), // Use timestamp for unique ID
        name: newCustomer.name,
        gmail: newCustomer.gmail,
        phone: newCustomer.phone,
        visits: parseInt(newCustomer.visits) || 0,
        lastVisit: newCustomer.lastVisit
      };
      
      const updatedCustomers = [...customers, newCustomerObj];
      setCustomers(updatedCustomers);
      setNewCustomer({ name: "", gmail: "", phone: "", visits: 0, lastVisit: "" });
      setIsAddModalOpen(false);
      alert("Customer added successfully!");
    } else {
      alert("Please fill in at least name and Gmail fields");
    }
  };

  // Open add customer modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Handle Excel file import
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Assuming first worksheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Process the data for preview
        const processedData = jsonData.map((item, index) => {
          return {
            id: Date.now() + index, // Temporary ID for preview
            name: item.Name || item.name || '',
            gmail: item.Gmail || item.gmail || item.Email || item.email || '',
            phone: item.Phone || item.phone || item.PhoneNumber || item.phoneNumber || '',
            visits: parseInt(item.Visits || item.visits || 0),
            lastVisit: formatDate(item.LastVisit || item.lastVisit || item['Last Visit'] || '')
          };
        });
        
        setImportData(processedData);
        setIsImportModalOpen(true);
        e.target.value = ''; // Reset file input
      } catch (error) {
        alert("Error reading Excel file: " + error.message);
        console.error("Excel import error:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Helper function to format dates from Excel
  const formatDate = (excelDate) => {
    if (!excelDate) return '';
    
    // If it's already a string in date format
    if (typeof excelDate === 'string') {
      return excelDate;
    }
    
    // If it's an Excel serial date
    if (typeof excelDate === 'number') {
      const date = new Date((excelDate - 25569) * 86400 * 1000);
      return date.toISOString().split('T')[0];
    }
    
    return '';
  };

  // Process imported data
  const processImportedData = () => {
    const results = {
      success: 0,
      errors: 0,
      messages: []
    };
    
    const newCustomers = [...customers];
    
    importData.forEach(customer => {
      // Validate required fields
      if (!customer.name || !customer.gmail) {
        results.errors++;
        results.messages.push(`Skipped customer: Missing name or Gmail for entry`);
        return;
      }
      
      // Check for duplicates
      const isDuplicate = newCustomers.some(
        c => c.gmail && c.gmail.toLowerCase() === customer.gmail.toLowerCase()
      );
      
      if (isDuplicate) {
        results.errors++;
        results.messages.push(`Skipped ${customer.name}: Gmail already exists`);
        return;
      }
      
      // Add customer with proper ID
      newCustomers.push({
        ...customer,
        id: Date.now() + Math.floor(Math.random() * 1000) // Better unique ID
      });
      
      results.success++;
      results.messages.push(`Added ${customer.name} successfully`);
    });
    
    setCustomers(newCustomers);
    setImportStatus(results);
    
    // Auto-close after 5 seconds if successful
    if (results.errors === 0) {
      setTimeout(() => {
        setIsImportModalOpen(false);
        setImportData([]);
        setImportStatus({ success: 0, errors: 0, messages: [] });
      }, 5000);
    }
  };

  // Clear all data (optional reset function)
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all customer data? This cannot be undone.")) {
      localStorage.removeItem('salonCustomers');
      setCustomers(initialCustomerData);
      localStorage.setItem('salonCustomers', JSON.stringify(initialCustomerData));
    }
  };

  return (
    <div className="tab-content">
      <div className="section-header">
        <h2>Customer Management</h2>
        <div>
          <button className="reset-btn" onClick={handleResetData} style={{marginRight: '10px'}}>
            Reset Data
          </button>
          <div className="file-import-btn" style={{display: 'inline-block', marginRight: '10px'}}>
            <label htmlFor="excel-upload" className="add-btn">
              Import from Excel
            </label>
            <input
              id="excel-upload"
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileImport}
              style={{display: 'none'}}
            />
          </div>
          <button className="add-btn" onClick={openAddModal}>
            Add New Customer
          </button>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search customers by name or Gmail..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="customers-table">
        {filteredCustomers.length === 0 ? (
          <p>No customers found. {searchTerm && 'Try a different search term.'}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gmail</th>
                <th>Phone</th>
                <th>Total Visits</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.gmail || "No Gmail"}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.visits}</td>
                  <td>{customer.lastVisit}</td>
                  <td>
                    <button 
                      className="edit-btn" 
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </button>
                    <button 
                      className="view-btn" 
                      onClick={() => handleView(customer)}
                    >
                      View
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Customer</h3>
              <button 
                className="close-btn" 
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name:*</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Gmail:*</label>
                <input
                  type="email"
                  value={newCustomer.gmail}
                  onChange={(e) => setNewCustomer({...newCustomer, gmail: e.target.value})}
                  placeholder="Enter Gmail address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Visits:</label>
                <input
                  type="number"
                  value={newCustomer.visits}
                  onChange={(e) => setNewCustomer({...newCustomer, visits: e.target.value})}
                  placeholder="Number of visits"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Last Visit:</label>
                <input
                  type="date"
                  value={newCustomer.lastVisit}
                  onChange={(e) => setNewCustomer({...newCustomer, lastVisit: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleAddCustomer}>
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && editingCustomer && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Customer</h3>
              <button 
                className="close-btn" 
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name:*</label>
                <input
                  type="text"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Gmail:*</label>
                <input
                  type="email"
                  value={editingCustomer.gmail || ''}
                  onChange={(e) => setEditingCustomer({...editingCustomer, gmail: e.target.value})}
                  placeholder="Enter Gmail address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Visits:</label>
                <input
                  type="number"
                  value={editingCustomer.visits}
                  onChange={(e) => setEditingCustomer({...editingCustomer, visits: e.target.value})}
                  placeholder="Number of visits"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Last Visit:</label>
                <input
                  type="date"
                  value={editingCustomer.lastVisit}
                  onChange={(e) => setEditingCustomer({...editingCustomer, lastVisit: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Data Modal */}
      {isImportModalOpen && (
        <div className="modal-overlay">
          <div className="modal import-modal">
            <div className="modal-header">
              <h3>Import Customers from Excel</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportData([]);
                  setImportStatus({ success: 0, errors: 0, messages: [] });
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {importStatus.messages.length > 0 ? (
                <div className="import-results">
                  <h4>Import Results:</h4>
                  <p className={importStatus.errors === 0 ? "success-text" : "error-text"}>
                    Successfully imported: {importStatus.success}, Errors: {importStatus.errors}
                  </p>
                  <div className="result-messages">
                    {importStatus.messages.map((msg, index) => (
                      <p key={index} className={msg.includes("Skipped") ? "error-text" : "success-text"}>
                        {msg}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p>Preview of data to be imported ({importData.length} customers):</p>
                  <div className="import-preview">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Gmail</th>
                          <th>Phone</th>
                          <th>Visits</th>
                          <th>Last Visit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importData.slice(0, 5).map((customer, index) => (
                          <tr key={index}>
                            <td>{customer.name}</td>
                            <td>{customer.gmail}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.visits}</td>
                            <td>{customer.lastVisit}</td>
                          </tr>
                        ))}
                        {importData.length > 5 && (
                          <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>
                              ... and {importData.length - 5} more
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="import-notes">
                    <p><strong>Note:</strong> The Excel file should have columns for Name, Gmail, Phone, Visits, and Last Visit.</p>
                    <p>Required fields: <strong>Name</strong> and <strong>Gmail</strong></p>
                    <p>The system will also accept "Email" as a column header for Gmail data.</p>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              {importStatus.messages.length === 0 ? (
                <>
                  <button className="cancel-btn" onClick={() => setIsImportModalOpen(false)}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={processImportedData}>
                    Import Customers
                  </button>
                </>
              ) : (
                <button className="cancel-btn" onClick={() => setIsImportModalOpen(false)}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerSelection;