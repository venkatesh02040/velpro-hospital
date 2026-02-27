import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import api from "../../Api/Api";
import toast, { Toaster } from "react-hot-toast";   // ← added
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/messages/", formData);

      // Success toast
      toast.success("Your message sent successfully.", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#d1fae5",
          color: "#065f46",
          border: "1px solid #34d399",
        },
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone_number: "",
        content: "",
      });
    } catch (err) {
      console.error("Failed to send message:", err);

      // Error toast
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to send message. Please try again or contact us directly.";

      toast.error(errorMsg, {
        duration: 6000,
        position: "top-center",
        style: {
          background: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #f87171",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="contact-page">
        {/* Banner / Hero Section */}
        <div className="contact-banner">
          <div className="banner-content">
            <h1>Contact</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
            </div>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="contact-container">
          <div className="contact-wrapper">
            {/* Left - Form */}
            <div className="contact-form-section">
              <div className="form-header">
                <h2>Contact Us</h2>
                <p>Make An Appointment Apply For Treatments</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>E-Mail:</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-Mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="phone_number"
                      placeholder="Phone"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Message:</label>
                  <textarea
                    name="content"
                    rows="6"
                    placeholder="Write A Message..."
                    value={formData.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="submit-btn">
                  <PrimaryButton
                    text={loading ? "Sending..." : "Send Message"}
                    disabled={loading}
                  />
                </div>
              </form>
            </div>

            {/* Right - Info Box */}
            <div className="contact-info-box">
              <div>
                <h3>Hours Of Operation</h3>
                <div className="info-item">
                  <div className="icon-circle">
                    <FiClock className="info-icon" />
                  </div>
                  <div>
                    <strong>Open 24 hours</strong>
                  </div>
                </div>
              </div>

              <div>
                <h3>Our Address</h3>
                <div className="info-item">
                  <div className="icon-circle">
                    <FiMapPin className="info-icon" />
                  </div>
                  <div>
                    415, 9th Main Rd, HRBR Layout 1st Block, HRBR Layout, Kalyan Nagar,
                    Bengaluru, Karnataka 560043
                  </div>
                </div>
              </div>

              <div>
                <h3>Contact</h3>
                <div className="info-item">
                  <div className="icon-circle">
                    <FiPhone className="info-icon" />
                  </div>
                  <div>
                    <a href="tel:+08049994000">(+080) 49994000</a><br />
                    <a href="tel:+918904740505">+91 8904740505</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="contact-map-section">
            <iframe
              title="Hospital Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.242266676282!2d77.64464591138716!3d13.020238413755601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17006aa246fb%3A0x973fd7407ea647e9!2sVelpro%20Hospital!5e0!3m2!1sen!2sin!4v1770880234017!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: "2px solid rgb(232, 232, 232)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />

      {/* Add Toaster component once at the root level */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: "16px",
            padding: "16px",
            borderRadius: "10px",
          },
          success: {
            style: {
              background: "#d1fae5",
              color: "#065f46",
              border: "1px solid #34d399",
            },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #f87171",
            },
          },
        }}
      />
    </>
  );
};

export default Contact;