import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // using react-icons for nice checkmarks
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./HomeCareServices.css";

const HomeCareServices = () => {
  const homeCareServices = [
    {
      title: "Blood Sample Collection at Home",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1470&auto=format&fit=crop",
      shortDesc:
        "Safe, convenient, and hygienic blood sample collection right at your doorstep.",
      points: [
        "Certified phlebotomists with strict hygiene & safety protocols",
        "Scheduled home visits at your preferred time",
        "Ideal for elderly, mobility-limited & chronic patients",
        "Secure sample transport to NABL-accredited labs",
        "Fast digital report delivery (email/WhatsApp)",
        "Reduces hospital visits, waiting time & travel stress",
      ],
    },
    {
      title: "Home Visits by Doctors",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop",
      shortDesc:
        "Expert medical consultation and care delivered directly to your home.",
      points: [
        "Experienced doctors for thorough clinical assessment",
        "Personalized diagnosis, treatment plans & prescriptions",
        "Perfect for seniors, post-discharge & chronic illness follow-up",
        "Timely health monitoring without hospital travel",
        "Comfortable consultation in familiar surroundings",
        "Compassionate, unhurried & patient-centered approach",
      ],
    },
    {
      title: "Home Nursing Care",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1470&auto=format&fit=crop",
      shortDesc:
        "Skilled nursing support bringing hospital-level care to your home.",
      points: [
        "Qualified nurses for medication, injections & wound care",
        "Vital signs monitoring & post-surgical recovery assistance",
        "Personalized care plans tailored to patient condition",
        "24×7 availability options for critical & elderly care",
        "Promotes faster healing in comfortable home environment",
        "Focus on safety, dignity, comfort & emotional support",
      ],
    },
  ];

  return (
    <>
      <Navbar />

      {/* Banner - same style as your Facilities / Blog page */}
      <section className="hs-banner homecare-banner">
        <div className="hs-banner-content">
          <h1>Home Care Services</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <span>Home Care Services</span>
          </div>
        </div>
      </section>

      {/* Main premium alternating layout */}
      <section className="facilities-premium">
        <div className="facilities-container">
          <div className="intro-section">
            <h2 className="intro-title">
              Compassionate Care Delivered to Your Doorstep
            </h2>
            <p className="intro-subtitle">
              We bring hospital-quality medical services to the comfort and safety of your home, making healthcare convenient, dignified, and stress-free.
            </p>
          </div>

          <div className="facilities-showcase">
            {homeCareServices.map((service, index) => (
              <div
                key={index}
                className={`facility-premium-card ${
                  index % 2 === 1 ? "reverse" : ""
                }`}
              >
                <div className="facility-hero-image">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="hero-img"
                  />
                  <div className="hero-gradient"></div>
                </div>

                <div className="facility-info-panel">
                  <h3 className="facility-main-title">{service.title}</h3>
                  <p className="facility-tagline">{service.shortDesc}</p>

                  <ul className="premium-features">
                    {service.points.map((point, i) => (
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

export default HomeCareServices;