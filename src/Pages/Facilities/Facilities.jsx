import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FaCheckCircle } from "react-icons/fa"; // using react-icons for nice checkmarks
import "./Facilities.css";

const Facilities = () => {
  const facilities = [
    {
      title: "Deluxe & Semi-Deluxe Wards",
      image:
        "/f1.jpg",
      shortDesc: "Luxurious private rooms designed for comfort, privacy, and faster recovery.",
      points: [
        "Spacious, well-ventilated rooms with premium furnishings",
        "High hygiene standards with daily deep cleaning",
        "Smart climate control & in-room entertainment",
        "24/7 attentive & compassionate nursing care",
        "Family-friendly visiting policy & support",
      ],
    },
    {
      title: "24×7 Four-Bed Intensive Care Unit",
      image:
        "/f2.jpg",
      shortDesc: "Advanced critical care with continuous monitoring and rapid response.",
      points: [
        "Multi-parameter monitors, ventilators & life-support systems",
        "Round-the-clock intensivists & specialized ICU nurses",
        "HEPA filtration & strict infection prevention protocols",
        "Immediate emergency intervention systems",
        "Family communication, counseling & emotional support",
      ],
    },
    {
      title: "Laminar Flow Operation Theatre",
      image:
        "/f3.jpg",
      shortDesc: "Ultra-sterile surgical suites ensuring maximum safety and precision.",
      points: [
        "Class 100 laminar airflow & advanced HEPA filtration",
        "State-of-the-art surgical lighting, tables & instruments",
        "Advanced anesthesia & real-time monitoring systems",
        "Zero-tolerance sterilization & safety protocols",
        "Highly experienced surgical & anesthesia teams",
      ],
    },
    {
      title: "Diagnostic Laboratory Centre",
      image:
        "/f4.jpg",
      shortDesc: "Fast, reliable, NABL-accredited diagnostic testing with rapid reporting.",
      points: [
        "Fully automated high-throughput analyzers",
        "Comprehensive hematology, biochemistry & microbiology",
        "Same-day results for most routine tests",
        "Barcoded sample tracking & full quality assurance",
        "Daily internal & external quality control checks",
      ],
    },
    {
      title: "Endoscopy & Colonoscopy Suite",
      image:
        "/f5.jpg",
      shortDesc: "Advanced minimally invasive diagnostics with high-definition imaging.",
      points: [
        "High-resolution scopes with narrow-band imaging technology",
        "Diagnostic & therapeutic endoscopy/colonoscopy procedures",
        "Biopsy & polypectomy capabilities",
        "Comfortable, private recovery bays",
        "Sedation & monitoring by expert anesthetists",
      ],
    },
    {
      title: "Radiology & Ultrasound Diagnostics",
      image:
        "/f6.jpg",
      shortDesc: "Cutting-edge imaging with fast, accurate reports and patient safety focus.",
      points: [
        "Digital X-ray, 4D ultrasound & Doppler studies",
        "Portable imaging services for bedridden patients",
        "PACS system for instant image access & sharing",
        "Low-radiation protocols & safety-first approach",
        "Expert radiologist interpretation & timely reporting",
      ],
    },
    {
      title: "Day Care Treatment Services",
      image:
        "/f7.jpg",
      shortDesc: "Efficient same-day medical procedures — recover at home.",
      points: [
        "Chemotherapy, minor surgeries, dialysis & infusions",
        "Comfortable recliners with entertainment options",
        "Dedicated day-care nursing & support team",
        "Cost-effective & significantly time-saving",
        "Post-procedure monitoring & same-day discharge",
      ],
    },
    {
      title: "Integrated In-House Pharmacy",
      image:
        "/f8.jpg",
      shortDesc: "24×7 access to genuine, quality medicines within the hospital.",
      points: [
        "100% authentic & properly stored medicines",
        "Clinical pharmacist counseling & guidance",
        "EMR-integrated prescription & dispensing system",
        "Home delivery service for discharged patients",
        "Special discounts for long-term & chronic medications",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      {/* Your original banner — untouched */}
      <section className="f-banner">
        <div className="f-banner-content">
          <h1>Facilities</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <span>Facilities</span>
          </div>
        </div>
      </section>

      {/* Completely new premium design */}
      <section className="facilities-premium">
        <div className="facilities-container">
          <div className="intro-section">
            <h2 className="intro-title">State-of-the-Art Facilities</h2>
            <p className="intro-subtitle">
              Every aspect of our hospital is built around patient comfort, safety, clinical excellence, and faster recovery.
            </p>
          </div>

          <div className="facilities-showcase">
            {facilities.map((facility, index) => (
              <div key={index} className="facility-premium-card">
                <div className="facility-hero-image">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    loading="lazy"
                    className="hero-img"
                  />
                  <div className="hero-gradient"></div>
                </div>

                <div className="facility-info-panel">
                  <h3 className="facility-main-title">{facility.title}</h3>
                  <p className="facility-tagline">{facility.shortDesc}</p>

                  <ul className="premium-features">
                    {facility.points.map((point, i) => (
                      <li key={i} className="feature-line">
                        <FaCheckCircle className="check-icon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Facilities;