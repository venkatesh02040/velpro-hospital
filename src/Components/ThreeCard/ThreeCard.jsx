// src/Components/ThreeCard/ThreeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import './ThreeCard.css';
import PrimaryButton from '../Buttons/PrimaryButton';

const facilities = [
  {
    title: "Deluxe & Semi-Deluxe Wards",
    description: [
      "Spacious, well-ventilated rooms designed for comfort and privacy.",
      "Equipped with modern amenities and attentive nursing care round the clock."
    ],
    bgImage: "/f1.jpg",   // ← replace with real path
    icon: "/double-bed.png"
  },
  {
    title: "24×7 Four-Bed Intensive Care Unit",
    description: [
      "Advanced ICU with state-of-the-art monitoring and life-support systems.",
      "Dedicated team of critical care specialists available 24 hours a day."
    ],
    bgImage: "/f2.jpg",           // ← replace with real path
    icon: "/monitor.png"
  },
  {
    title: "Laminar Flow Operation Theatre",
    description: [
      "Ultra-clean, bacteria-controlled environment for complex surgeries.",
      "Equipped with cutting-edge technology for maximum patient safety."
    ],
    bgImage: "/f3.jpg",  // ← replace with real path
    icon: "/emergency-room.png"
  }
];

const ThreeCard = () => {
  return (
    <section className="facilities-section">
      <div className="facilities-container">
        <div className="section-header">
          <h2>Our Key Facilities</h2>
          <p>World-class infrastructure designed for comfort, safety, and superior outcomes.</p>
        </div>

        <div className="facilities-grid">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="facility-card"
              style={{ backgroundImage: `url(${facility.bgImage})` }}
            >
              <div className="card-overlay"></div>

              <div className="facility-content">
                <div style={{ width: "80px",height:"80px",border:"2px solid white",padding:"13px",borderRadius:"10%",objectFit:"contain",marginBottom:"15px" }}>
                  <img style={{ width: "50px",height:"50px"}} src={facility.icon} alt={facility.title} />
                </div>
                  <h3 className="facility-title">{facility.title}</h3>

                <div className="facility-description">
                  <p>{facility.description[0]}</p>
                  <p>{facility.description[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="explore-button-wrapper">
          <Link to="/facilities">
            <PrimaryButton text='Explore our Facilities' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThreeCard;