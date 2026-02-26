import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./DoctorDetail.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import api from "../../Api/Api";   // your axios instance

const DoctorDetail = () => {
  const { slug } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    date: "",
    time: "",
    message: "",
    paymentMode: "Pay at Hospital",
  });
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/api/doctors/${slug}/`);

        setDoctor(response.data);
      } catch (err) {
        console.error("Failed to load doctor:", err);
        setError("Doctor profile not found or unable to load.");
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [slug]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSummary(true); // Show summary popup
  };

  const confirmAppointment = () => {
    if (formData.paymentMode === "Pay Now") {
      // Simulate redirect to payment gateway
      alert("Redirecting to Payment Gateway... (Payment integration placeholder)");
      // In real app: window.location.href = "/payment?doctor=" + slug + "&fee=" + doctor.fee;
    } else {
      alert("Appointment Booked Successfully! You will receive confirmation via WhatsApp/SMS.");
    }
    setShowSummary(false);
    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      gender: "",
      date: "",
      time: "",
      message: "",
      paymentMode: "Pay at Hospital",
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="doctor-not-found">
          <h2>Loading Doctor Profile...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !doctor) {
    return (
      <>
        <Navbar />
        <div className="doctor-not-found">
          <h2>Doctor Not Found</h2>
          <p>The requested doctor's profile could not be located.</p>
          <Link to="/doctors" className="back-link">
            ← Back to All Doctors
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section
        className="doctor-hero"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&auto=format&fit=crop")`,
        }}
      >
        <div className="dd-hero-overlay"></div>
        <div className="dd-hero-content">
          <div className="doctor-avatar-large">
            <img 
              src={doctor.photo} 
              alt={doctor.name} 
              className="avatar-img"
              onError={(e) => { e.target.src = "/fallback-doctor.jpg"; }}
            />
          </div>
          <h1 className="dd-hero-title">{doctor.name}</h1>
          <p className="dd-hero-designation">{doctor.designation}</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/doctors">Doctors</Link> <span>/</span>
            <span>{doctor.name}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="doctor-main">
        <div className="doctor-container">
          {/* Left - Profile Info */}
          <div className="doctor-profile">
            <div className="profile-card">
              <h2 className="profile-title">About Dr. {doctor.name.split(" ").slice(1).join(" ")}</h2>
              <div
                className="doctor-description rich-text"
                dangerouslySetInnerHTML={{ __html: doctor.description || "<p>No detailed description available.</p>" }}
              />

              <div className="doctor-stats">
                <div className="stat-item">
                  <span className="stat-label">Experience</span>
                  <span className="stat-value">{doctor.experience_years} Years</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Specialization</span>
                  <span className="stat-value">{doctor.department_name}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Consultation Fee</span>
                  <span className="stat-value">₹{parseFloat(doctor.fee).toLocaleString()}</span>
                </div>
              </div>

              <div className="doctor-qualifications">
                <h3>Qualifications</h3>
                <p>{doctor.education}</p>
              </div>

              <div className="doctor-contact-info">
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Phone:</strong> {doctor.number}</p>
                <p><strong>City:</strong> {doctor.city}</p>
              </div>
            </div>
          </div>

          {/* Right - Appointment Form */}
          <div className="doctor-appointment">
            <div className="appointment-card">
              <h2 className="appointment-title">Book an Appointment</h2>
              <p className="appointment-subtitle">
                Consultation Fee: <strong>₹{parseFloat(doctor.fee).toLocaleString()}</strong>
              </p>

              <form className="appointment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="modern-date"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="modern-select"
                  >
                    <option value="">Select time slot</option>
                    <option>09:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>02:00 PM - 03:00 PM</option>
                    <option>04:00 PM - 05:00 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="paymentMode">Payment Mode</label>
                  <select
                    id="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleChange}
                    required
                    className="modern-select"
                  >
                    <option value="Pay at Hospital">Pay at Hospital</option>
                    <option value="Pay Now">Pay Now (Online)</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label htmlFor="message">Reason / Symptoms (optional)</label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your concern..."
                  ></textarea>
                </div>

                <PrimaryButton text="Confirm Appointment" type="submit" fullWidth />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Popup Modal */}
      {showSummary && (
        <div className="summary-modal-overlay">
          <div className="summary-modal">
            <h2>Appointment Summary</h2>
            <div className="summary-details">
              <p><strong>Doctor:</strong> {doctor.name}</p>
              <p><strong>Specialization:</strong> {doctor.department_name}</p>
              <p><strong>Fee:</strong> ₹{parseFloat(doctor.fee).toLocaleString()}</p>
              <p><strong>Patient Name:</strong> {formData.name}</p>
              <p><strong>Gender:</strong> {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Date:</strong> {formData.date || "Not selected"}</p>
              <p><strong>Time:</strong> {formData.time || "Not selected"}</p>
              <p><strong>Payment Mode:</strong> {formData.paymentMode}</p>
              {formData.message && (
                <p><strong>Reason:</strong> {formData.message}</p>
              )}
            </div>

            <div className="modal-actions">
              {formData.paymentMode === "Pay Now" ? (
                <PrimaryButton
                  text="Proceed to Payment"
                  onClick={confirmAppointment}
                  fullWidth
                />
              ) : (
                <PrimaryButton
                  text="Confirm & Book Appointment"
                  onClick={confirmAppointment}
                  fullWidth
                />
              )}
              <button className="cancel-btn" onClick={() => setShowSummary(false)}>
                Edit Details
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default DoctorDetail;