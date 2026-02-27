// src/pages/Careers.jsx (or wherever it lives)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";
import "./Careers.css";

// Import your custom animated Loader
import Loader from "../../Components/Loader/Loader";  // adjust path if needed

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/careers/");

        // Sort by priority (lower number = higher priority)
        const sorted = response.data.sort(
          (a, b) => parseFloat(a.priority || 999) - parseFloat(b.priority || 999)
        );

        setJobs(sorted);
      } catch (err) {
        console.error("Failed to load careers:", err);
        setError("Unable to load job openings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="careers-hero">
          <div className="careers-hero-content">
            <h1>Careers</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
            </div>
          </div>
        </section>

        <div className="careers-loading-wrapper">
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
        <section className="careers-hero">
          <div className="careers-hero-content">
            <h1>Careers</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
            </div>
          </div>
        </section>

        <div className="careers-error-wrapper">
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
      <section className="careers-hero">
        <div className="careers-hero-content">
          <h1>Careers</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
          </div>
        </div>
      </section>

      <section className="careers-main">
        <div className="careers-container">
          <h2 className="careers-title">Join Our Team</h2>
          <p className="careers-subtitle">Explore exciting opportunities to grow your career with us.</p>

          <div className="positions-list">
            {jobs.length === 0 ? (
              <p className="no-jobs-message">
                No job openings available at the moment.
              </p>
            ) : (
              jobs.map((job) => (
                <div key={job.slug} className="position-card">
                  <h3 className="position-name">{job.job_title}</h3>
                  <p className="position-dept">Department: {job.department}</p>
                  <p className="position-exp">Experience Required: {job.experience} years</p>
                  <Link to={`/careers/${job.slug}`} className="view-btn">
                    View Position
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Careers;