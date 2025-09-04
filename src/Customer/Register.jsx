import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setMessage("❌ Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('customers') || '[]');
      const userExists = existingUsers.some(user => user.email === formData.email);
      
      if (userExists) {
        setMessage("❌ An account with this email already exists");
        setIsLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now(), // Simple ID generation
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: "customer"
      };
      
      // Save to localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('customers', JSON.stringify(updatedUsers));
      
      setMessage("✅ Account created successfully! Redirecting to login...");
      
      // Redirect to login after delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      setMessage("❌ Registration error. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="logo">
            <img 
              src='https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRyA7L-SuIQXGe1g66YouX9Vm45DB1qXa46MBrrWh9qOYvjFpVP' 
              alt="Salon Logo"
              className="navbar-logo me-3"
            />
            <h1>Create Account</h1>
          </div>
          <p>Join us to book appointments and manage your services</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          {message && (
            <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </form>

        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-text">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="register-footer">
          <p>Customer portal • Beauty Salon App</p>
        </div>
      </div>
    </div>
  );
}

export default Register;