import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  // Predefined users (10 staff + 1 admin)
  const users = [
    { id: 'Admin', password: 'Admin@22', type: 'admin', name: 'Abisri' },
    { id: 'Staff', password: 'Staff123', type: 'staff', name: 'Staff' },
  ];

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = users.find(u => u.id === userId && u.password === password);
    
    if (user) {
      // ✅ Send logged-in user to App.js
      onLogin(user);
    } else {
      setError('Invalid user ID or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <img 
          src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP' 
          alt="Salon Logo"
          className="auth-logo"
        />
        <h1>Login Page</h1>
        <p>Access your admin or staff account</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleLogin} className="auth-form">
        <div className="input-field">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            required
            autoComplete="username"
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="visibility-toggle"
              onClick={togglePasswordVisibility}
            >
             

                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
            </button>
          </div>
        </div>

        <div className="password-help">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            alert('Please contact your system administrator for password reset.');
          }}>
            Forgot Password?
          </a>
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loader"></span>
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <div className="demo-info">
        <h3>Demo Credentials:</h3>
        <p><strong>Admin:</strong> admin@01 / admin123</p>
        <p><strong>Staff:</strong> staff@01 / staff123</p>
      </div>
    </div>
  );
};

export default LoginPage;