import React from 'react';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="hero">
        <h1>Welcome to DentalClinic Manager</h1>
        <p>Efficient patient management for dental professionals</p>
      </header>
      
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Patient Profiles</h3>
            <p>Manage patient information efficiently</p>
          </div>
          <div className="feature-card">
            <h3>Appointment History</h3>
            <p>Track all patient visits and treatments</p>
          </div>
          <div className="feature-card">
            <h3>Secure Access</h3>
            <p>Protected patient information</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage; 