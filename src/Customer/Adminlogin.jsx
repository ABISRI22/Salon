import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mock admin data
  const mockAdmins = [
    { id: 1, email: "admin@timelesstrendz.com", password: "admin123", name: "Admin User", role: "admin" },
    { id: 2, email: "manager@timelesstrendz.com", password: "manager123", name: "Manager User", role: "admin" },
    { id: 3, email: "demo@admin.com", password: "admin123", name: "Demo Admin", role: "admin" }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log("Admin login attempt:", { email, password });
      
      // Check if it's a demo admin login
      if (email === "demo@admin.com" && password === "admin123") {
        const demoAdmin = {
          id: 100,
          name: "Demo Admin",
          email: email,
          role: "admin"
        };
        
        handleSuccessfulLogin(demoAdmin);
        return;
      }
      
      // Check admin users in localStorage
      const registeredAdmins = JSON.parse(localStorage.getItem('admins') || '[]');
      const registeredAdmin = registeredAdmins.find(admin => 
        admin.email === email && admin.password === password
      );
      
      if (registeredAdmin) {
        handleSuccessfulLogin(registeredAdmin);
        return;
      }
      
      // Check if admin exists in mock data
      const admin = mockAdmins.find(a => a.email === email && a.password === password);
      
      if (admin) {
        handleSuccessfulLogin(admin);
      } else {
        setMessage("❌ Invalid admin credentials. Please try again.");
        console.log("Admin login failed: Invalid credentials");
      }
    } catch (error) {
      setMessage("❌ Login error. Please try again.");
      console.error("Admin login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (adminData) => {
    setMessage("✅ Admin login successful!");
    console.log("Admin logged in:", adminData);
    
    // Store admin data in localStorage
    localStorage.setItem('user', JSON.stringify(adminData));
    
    // Call the onLogin callback with admin data
    if (onLogin) {
      onLogin(adminData);
    }
    
    // Redirect to admin dashboard
    navigate("/admin/dashboard");
  };

  const fillDemoCredentials = () => {
    setEmail("demo@admin.com");
    setPassword("admin123");
    setMessage("💡 Demo admin credentials filled. Click 'Sign In' to continue.");
    console.log("Demo credentials filled for admin");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <img 
              src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP' 
              alt="Salon Logo"
              className="navbar-logo me-3"
            />
            <h1>Admin Login</h1>
          </div>
          <p>Access the admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Admin Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="password-label">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="password-input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In as Admin'
            )}
          </button>

          {message && (
            <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="demo-section">
            <button 
              type="button" 
              className="demo-button"
              onClick={fillDemoCredentials}
            >
              Use Demo Admin Credentials
            </button>
          </div>
         
          <div className="signup-link">
            <p>
              Customer?{" "}
              <Link to="/login" className="signup-text">
                Customer Login
              </Link>
            </p>
          </div>
        </form>

        <div className="login-footer">
          <p>Admin portal • TimelessTrendz Salon App</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;