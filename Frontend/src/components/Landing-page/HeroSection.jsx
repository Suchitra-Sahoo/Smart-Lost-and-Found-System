// Frontend/src/components/Landing page/HeroSection.jsx

import React from "react";
import "./HeroSection.css"; // Import the dedicated CSS file

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Main Headline */}
        <h1 className="hero-title">Smart Lost & Found System</h1>

        {/* Sub-Headline/Description */}
        <p className="hero-description">
          Effortlessly recover your lost belongings or report found items
          quickly and efficiently within the campus.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="hero-actions">
          {/* Primary CTA (Matching the "Report Lost Item" link in your navbar) */}
          <a href="/report-lost-item" className="btn btn-primary">
            Report Lost Item
          </a>

          {/* Secondary CTA (Matching the "Report Found Item" link in your navbar) */}
          <a href="/report-found-item" className="btn btn-secondary">
            Report Found Item
          </a>
        </div>
      </div>

      {/* Optional: Add an illustration or image here to make it more visually appealing.
        <div className="hero-image">
          <img src="/assets/magnifying-glass.svg" alt="Campus Lost and Found" />
        </div> 
      */}
    </section>
  );
};

export default HeroSection;
