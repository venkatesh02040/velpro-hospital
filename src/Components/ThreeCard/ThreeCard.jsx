// src/Components/ThreeCard/ThreeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BsClock, BsGeoAlt, BsTelephone } from 'react-icons/bs';
import { FiArrowRight } from "react-icons/fi";
import './ThreeCard.css';

const ThreeCard = () => {
  return (
    <section className="three-cards-section">
      <div className="cards-container">
        {/* Card 1 - Schedule Hours */}
        <div className="info-card blue">
          <div className="card-header">
            <div className="icon-circle">
              <BsClock size={28} color='#1e295a' />
            </div>
            <h3>Schedule Hours</h3>
          </div>
          <div className="card-content">
            <div className="hours-row">
              <span>Monday – Friday</span>
              <span>08:00 am - 06:00 pm</span>
            </div>
            <div className="hours-row">
              <span>Saturday</span>
              <span>09:30 am - 05:30 pm</span>
            </div>
            <div className="hours-row">
              <span>Sunday</span>
              <span>09:00 am - 03:30 pm</span>
            </div>
            <div className="hours-row highlight">
              <span>24/7 Service Available</span>
            </div>
          </div>
        </div>

        {/* Card 2 - Our Location */}
        <div className="info-card dark">
          <div className="card-header">
            <div className="icon-circle">
              <BsGeoAlt size={28} color='#1e295a' />
            </div>
            <h3>Our Location</h3>
          </div>
          <a
            href="https://maps.app.goo.gl/1BVnUQKupncmNidJ6" style={{textDecoration:"none"}}>
            <div className="card-content">
              <p style={{ marginBottom: "8px" }}>
                Visit our centrally located Bengaluru hospital for quick access. Experience trusted care delivered with precision and compassion.
              </p>
              <p>
                Reach our well-connected Bengaluru facility near major roads. Receive reliable healthcare backed by expertise you can count on.
              </p>
              <a
                href="https://maps.app.goo.gl/1BVnUQKupncmNidJ6"
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
              >
                GET DIRECTIONS <span style={{ width: "20px", height: "20px", marginTop: "5px" }}><FiArrowRight /></span>
              </a>
            </div>
          </a>
        </div>

        {/* Card 3 - Emergency Cases (now consistent style) */}
        <div className="info-card emergency">
          <div className="card-header">
            <div className="icon-circle">
              <BsTelephone size={28} color='#1e295a' />
            </div>
            <h3>Emergency Cases</h3>
          </div>
          <a href="tel:080-49994000" style={{ textDecoration: "none" }}>
            <div className="card-content">
              <p style={{ marginBottom: "8px" }}>
                Our 24/7 Emergency Department is ready for urgent and critical cases. Fast response and expert care you can rely on day or night.
              </p>
              <p>
                Call anytime for immediate emergency help from professionals. Rapid assessment and advanced treatment when every second counts.
              </p>
              <div className="emergency-phone">
                <a href="tel:080-49994000" className="action-btn">Call Now <span style={{ width: "20px", height: "20px", marginTop: "5px" }}><FiArrowRight /></span></a>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ThreeCard;