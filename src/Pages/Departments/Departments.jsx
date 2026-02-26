import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";   // ← your axios instance with baseURL & token handling

import "./Departments.css";

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

        // Optional: filter only departments where show_on_homepage === true
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
        <div className="departments-main-page">
          <div className="departments-main-banner">
            <div className="banner-content">
              <h1>Departments</h1>
              <div className="breadcrumb">
                <Link to="/">Home</Link> <span>/</span><span>Departments</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            Loading departments...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="departments-main-page">
          <div className="departments-main-banner">
            <div className="banner-content">
              <h1>Departments</h1>
              <div className="breadcrumb">
                <Link to="/">Home</Link> <span>/</span><span>Departments</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#d32f2f" }}>
            {error}
          </div>
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
              <div style={{ textAlign: "center", padding: "40px 20px", gridColumn: "1 / -1" }}>
                No departments available at the moment.
              </div>
            ) : (
              departments.map((dept) => (
                <div key={dept.slug} className="service-card">
                  <div className="service-image-container">
                    <img
                      src={dept.banner}                    // ← using banner as main card image
                      alt={dept.title}
                      className="service-image"
                    />
                  </div>

                  <div className="service-content">
                    <div className="service-icon-wrapper">
                      <img
                        src={dept.icon}                     // ← using icon as small icon
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