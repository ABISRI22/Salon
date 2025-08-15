// LoginPage.jsx
import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState('customer');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const roles = [
    { id: 'customer', label: 'Customer' },
    { id: 'admin', label: 'Admin' },
    { id: 'staff', label: 'Staff' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${activeRole}`, credentials);
    // Add authentication logic here
  };

  return (
    <div className="login-portal">
      <div className="login-card">
        <div className="app-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
          <h1>Welcome Back</h1>
          <p>Please login to continue</p>
        </div>

        <div className="role-selector">
          {roles.map(role => (
            <button
              key={role.id}
              className={`role-btn ${activeRole === role.id ? 'active' : ''}`}
              onClick={() => setActiveRole(role.id)}
            >
              {role.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>{activeRole} Login</h2>
            <div className="role-badge">{activeRole}</div>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>

        <div className="login-footer">
          <a href="#forgot">Forgot password?</a>
          <span>Don't have an account? <a href="#register">Register</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;