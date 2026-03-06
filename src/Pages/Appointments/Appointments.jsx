// src/pages/Appointments.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiX, FiCalendar, FiUser, FiClock } from "react-icons/fi";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";
import toast, { Toaster } from "react-hot-toast";
import "./Appointments.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";

const Appointments = () => {
  const [email, setEmail] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const hasEmail = email.trim().length > 0;

  const fetchAppointments = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);
    setAppointments([]);
    setHasSearched(true);

    try {
      const response = await api.get(
        `/api/view-user-appointments/?email=${encodeURIComponent(trimmedEmail)}`
      );

      const data = response.data;

      if (data.appointments?.length > 0) {
        setAppointments(data.appointments);
        toast.success(`Found ${data.appointments.length} appointments`, {
          duration: 4000,
        });
      } else {
        setAppointments([]);
        // No success toast here – handled in UI
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      const msg = err.response?.data?.detail || "Failed to load appointments.";
      setError(msg);
      toast.error(msg, { duration: 6000 });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAppointments();
  };

  const clearSearch = () => {
    setEmail("");
    setAppointments([]);
    setHasSearched(false);
    setError(null);
  };

  const getStatusStyle = (status) => {
    const upper = status?.toUpperCase() || "";
    if (upper === "COMPLETED") return { bg: "#d1fae5", color: "#065f46", label: "Completed" };
    if (upper === "PENDING") return { bg: "#fef3c7", color: "#92400e", label: "Pending" };
    if (upper === "CANCELLED") return { bg: "#fee2e2", color: "#991b1b", label: "Cancelled" };
    return { bg: "#e5e7eb", color: "#374151", label: status || "Unknown" };
  };

  return (
    <>
      <Navbar />

      {/* Banner – same as Doctors.jsx */}
      <section className="doctors-banner">
        <div className="doctors-banner-content">
          <h1>Appointments</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Appointments</span>
          </div>
        </div>
      </section>

      <section className="appointments-section">
        <div className="appointments-container">
          {/* Search Bar */}
          <div className="search-wrapper">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="email"
                  placeholder="Enter your email to view your appointments..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {hasEmail && (
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={clearSearch}
                    title="Clear search"
                  >
                    <FiX />
                  </button>
                )}
              </div>
              <button type="submit" className="search-btn" disabled={loading || !hasEmail}>
                {loading ? "Searching..." : "Search"}
              </button>
            </form>

            {/* Helper text – shown only before any search */}
            {!hasSearched && (
              <p className="helper-text">
                Enter your email above and click Search to view your appointments.
              </p>
            )}
          </div>

          {/* Results Area */}
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading your appointments...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchAppointments} className="retry-btn">
                Try Again
              </button>
            </div>
          ) : hasSearched && appointments.length === 0 ? (
            <div className="no-results">
              <h3>No Appointments Found</h3>
              <p>No appointments found for <strong>{email}</strong>.</p>
              <p>Book your next appointment today!</p>
              <Link to="/doctors" className="book-now-link">
                <PrimaryButton text="Book Appointment"/>
              </Link>
            </div>
          ) : appointments.length > 0 ? (
            <div className="appointments-grid">
              {appointments.map((appt) => {
                const statusStyle = getStatusStyle(appt.status);

                return (
                  <div key={appt.appointment_id} className="appointment-card">
                    <div className="card-header">
                      <h3>{appt.patient_name}</h3>
                      <span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                        {statusStyle.label}
                      </span>
                    </div>

                    <div className="card-body">
                      <p className="doctor-name">
                        <FiUser /> Dr. {appt.doctor_name}
                      </p>
                      <p className="department">
                        <FiClock /> {appt.department}
                      </p>
                      <p className="date">
                        <FiCalendar /> {appt.appointment_date}
                      </p>
                      <p className="time">
                        <FiClock /> {appt.start_time} – {appt.end_time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </section>

      <Footer />

      {/* <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: { fontSize: "16px", padding: "16px", borderRadius: "10px" },
          success: { style: { background: "#d1fae5", color: "#065f46" } },
          error: { style: { background: "#fee2e2", color: "#991b1b" } },
        }}
      /> */}
    </>
  );
};

export default Appointments;