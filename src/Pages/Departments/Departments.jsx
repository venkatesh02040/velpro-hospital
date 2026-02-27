// src/pages/Departments.jsx (or wherever it lives)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";
import "./Departments.css";

// Import your custom animated Loader
import Loader from "../../Components/Loader/Loader";  // adjust path if needed

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/departments/");

        // Optional: filter only visible ones
        // const visibleDepts = response.data.filter(d => d.show_on_homepage);
        setDepartments(response.data || []);
      } catch (err) {
        console.error("Failed to load departments:", err);
        setError("Unable to load departments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="departments-main-banner">
          <div className="banner-content">
            <h1>Departments</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span><span>Departments</span>
            </div>
          </div>
        </section>

        <div className="departments-loading-wrapper">
          <Loader />
        </div>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <section className="departments-main-banner">
          <div className="banner-content">
            <h1>Departments</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span><span>Departments</span>
            </div>
          </div>
        </section>

        <div className="departments-error-wrapper">
          <p className="error-message">{error}</p>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="departments-main-page">
        {/* Banner */}
        <div className="departments-main-banner">
          <div className="banner-content">
            <h1>Departments</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span><span>Departments</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="departments-main-container">
          <div className="section-header">
            <h2>OUR DEPARTMENTS</h2>
            <h3>Care We Offer</h3>
            <p>Expert medical care across multiple specialties</p>
          </div>

          <div className="departments-main-grid">
            {departments.length === 0 ? (
              <div className="no-departments-message">
                No departments available at the moment.
              </div>
            ) : (
              departments.map((dept) => (
                <div key={dept.slug} className="service-card">
                  <Link to={`/departments/${dept.slug}`} style={{ textDecoration: "none" }}>
                    <div className="service-image-container">
                      <img
                        src={dept.banner}
                        alt={dept.title}
                        className="service-image"
                      />
                    </div>
                    <div className="service-content">
                      <div className="service-icon-wrapper">
                        <img
                          src={dept.icon}
                          alt={`${dept.title} icon`}
                          className="service-icon"
                        />
                      </div>

                      <h3 className="service-title">{dept.title}</h3>
                      <div
                        className="service-description"
                        dangerouslySetInnerHTML={{ __html: dept.description || "<p>No description available.</p>" }}
                      />

                      <Link to={`/departments/${dept.slug}`} className="learn-more-link">
                        Know More →
                      </Link>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Departments;