import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mock customer data for demonstration
  const mockCustomers = [
    { id: 1, email: "customer1@example.com", password: "password123", name: "Abisri" },
    { id: 2, email: "customer2@example.com", password: "password123", name: "Jane Smith" },
    { id: 3, email: "demo@example.com", password: "demo123", name: "Demo Customer" }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log("Customer login attempt:", { email, password });
      
      // Check if it's a demo login
      if (email === "abisri2209@example.com" && password === "abisri123") {
        const demoCustomer = {
          id: 100,
          name: "Demo User",
          email: email,
          role: "customer"
        };
        
        handleSuccessfulLogin(demoCustomer);
        return;
      }
      
      // Check if it's any Gmail address
      if (email.endsWith('@gmail.com')) {
        // For any Gmail address, create a customer profile
        const newCustomer = {
          id: Math.floor(Math.random() * 10000), // Generate random ID
          name: email.split('@')[0], // Use the part before @ as name
          email: email,
          role: "customer"
        };
        
        handleSuccessfulLogin(newCustomer);
        return;
      }
      
      // Check registered users in localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('customers') || '[]');
      const registeredUser = registeredUsers.find(user => user.email === email && user.password === password);
      
      if (registeredUser) {
        handleSuccessfulLogin(registeredUser);
        return;
      }
      
      // Check if customer exists in mock data for non-Gmail addresses
      const customer = mockCustomers.find(c => c.email === email && c.password === password);
      
      if (customer) {
        handleSuccessfulLogin(customer);
      } else {
        setMessage("❌ Invalid email or password. Please try again.");
        console.log("Login failed: Invalid credentials");
      }
    } catch (error) {
      setMessage("❌ Login error. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = (customerData) => {
    setMessage("✅ Login successful! Welcome back!");
    console.log("Customer logged in:", customerData);
    
    // Store customer data in localStorage
    localStorage.setItem('user', JSON.stringify(customerData));
    
    // Call the onLogin callback with customer data
    if (onLogin) {
      onLogin(customerData);
    }
    
    // Redirect to home page
    navigate("/");
  };

  const fillDemoCredentials = () => {
    setEmail("abisri2209@example.com");
    setPassword("abisri123");
    setMessage("💡 Demo credentials filled. Click 'Sign In' to continue.");
    console.log("Demo credentials filled for customer");
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
            <h1>Customer Login</h1>
          </div>
          <p>Sign in to explore our services</p>
        
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email (any @gmail.com accepted)"
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
                placeholder="Enter any password for @gmail.com addresses"
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
              'Sign In'
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
              Use Demo Credentials
            </button>
          </div>
         
          <div className="signup-link">
            <p>
              New customer?{" "}
              <Link to="/register" className="signup-text">
                Create an account
              </Link>
            </p>
          </div>
        </form>

        <div className="login-footer">
          <p>Customer portal • TimelessTrendz Salon App</p>
        </div>
      </div>
    </div>
  );
}

export default Login;