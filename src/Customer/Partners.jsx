import React, { useState } from "react";
import "./Partners.css";

function Partners() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    partnershipType: "supplier"
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
      partnershipType: "supplier"
    });
  };

  return (
    <div className="partners-page">
      {/* Hero Section */}
      <section className="partners-hero">
        <div className="hero-content">
          <h1>Partner with TimelessTrendz</h1>
          <p>Join forces with Chennai's premier salon to create exceptional beauty experiences</p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="benefits-section">
        <div className="container">
          <h2>Why Partner With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">👥</div>
              <h3>Premium Clientele</h3>
              <p>Access our discerning customer base who value quality and luxury experiences.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Business Growth</h3>
              <p>Increase your brand visibility and revenue through our collaborative efforts.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌟</div>
              <h3>Brand Association</h3>
              <p>Align your brand with Chennai's most trusted salon for beauty and wellness.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💡</div>
              <h3>Innovation</h3>
              <p>Co-create new products and services with our expert stylists and technicians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="partnership-types">
        <div className="container">
          <h2>Partnership Opportunities</h2>
          <div className="types-grid">
            <div className="type-card">
              <h3>Product Suppliers</h3>
              <p>Provide premium hair care, cosmetics, or beauty products for our salon and retail space.</p>
              <ul>
                <li>Brand visibility in-salon</li>
                <li>Product testing with professionals</li>
                <li>Co-branded marketing campaigns</li>
              </ul>
            </div>
            <div className="type-card">
              <h3>Service Collaborations</h3>
              <p>Offer complementary services like spa treatments, makeup artistry, or beauty workshops.</p>
              <ul>
                <li>Cross-promotion opportunities</li>
                <li>Shared client referrals</li>
                <li>Package deal creations</li>
              </ul>
            </div>
            <div className="type-card">
              <h3>Technology Partners</h3>
              <p>Provide innovative solutions for salon management, booking systems, or customer engagement.</p>
              <ul>
                <li>Real-world product testing</li>
                <li>Case study development</li>
                <li>Industry exposure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="current-partners">
        <div className="container">
          <h2>Our Valued Partners</h2>
          <div className="partners-grid">
            <div className="partner-logo">
              <div className="logo-placeholder">L'Oreal</div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">Wella</div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">Schwarzkopf</div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">Dyson</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="partner-contact">
        <div className="container">
          <h2>Become a Partner</h2>
          <p>Interested in partnering with TimelessTrendz? Fill out the form below and our partnership team will contact you.</p>
          
          {submitted && (
            <div className="success-message">
              Thank you for your interest! We'll be in touch soon.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="partner-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="partnershipType">Partnership Type</label>
                <select
                  id="partnershipType"
                  name="partnershipType"
                  value={formData.partnershipType}
                  onChange={handleChange}
                  required
                >
                  <option value="supplier">Product Supplier</option>
                  <option value="service">Service Collaboration</option>
                  <option value="technology">Technology Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Submit Partnership Inquiry</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Partners;