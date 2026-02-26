import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";
import "./HealthCheckup.css";

const HealthCheckup = () => {
  const [banner] = useState({
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [bookingStatus, setBookingStatus] = useState(""); // success/error message

  // Fetch health checkup packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/health-checkups/");

        // Sort by priority (lower number = higher priority)
        const sortedPackages = response.data.sort(
          (a, b) => parseFloat(a.priority) - parseFloat(b.priority)
        );

        setPackages(sortedPackages);
      } catch (err) {
        console.error("Failed to load health checkup packages:", err);
        setError("Unable to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setBookingStatus(""); // reset status
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setBookingStatus("");
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    if (!selectedPackage) return;

    try {
      setBookingStatus("Booking in progress...");

      const payload = {
        plan_id: selectedPackage.id,   // send slug to identify package
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        message: formData.message,
      };

      const response = await api.post("/api/health-checkup/book/", payload);

      // Success
      setBookingStatus("Booking successful! You will receive confirmation soon.");
      alert("Booking confirmed! Check your email/SMS for details.");
      closeModal();
    } catch (err) {
      console.error("Booking failed:", err);
      setBookingStatus(
        err.response?.data?.detail ||
        "Failed to book. Please try again or contact support."
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <section
          className="healthcheckup-banner"
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="banner-overlay"></div>
        </section>
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          Loading health checkup packages...
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <section
          className="healthcheckup-banner"
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="banner-overlay"></div>
        </section>
        <div style={{ textAlign: "center", padding: "100px 20px", color: "red" }}>
          {error}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section
        className="healthcheckup-banner"
        style={{ backgroundImage: `url(${banner.image})` }}
      >
        <div className="banner-overlay"></div>
      </section>

      <section className="healthcheckup-section">
        <div className="healthcheckup-container">
          <h2 className="section-title">
            Available Health Checkup Packages
          </h2>
          <p className="section-subtitle">
            Choose from our comprehensive packages tailored for your wellness
            needs.
          </p>

          <div className="packages-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="package-image-wrapper">
                  <img src={pkg.image} alt={pkg.title} loading="lazy" />
                </div>

                <div className="package-content">
                  <h3 className="package-title">{pkg.title}</h3>

                  {/* Scrollable Tests */}
                  <div className="tests-container">
                    <ul className="tests-list">
                      {pkg.tests.map((test, i) => (
                        <li key={i}>{test}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer pinned at bottom */}
                  <div className="package-footer">
                    <p className="package-price">
                      ₹{parseFloat(pkg.price).toLocaleString()}
                    </p>
                    <button
                      className="book-btn"
                      onClick={() => openModal(pkg)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h2>Book {selectedPackage?.title}</h2>
            <p>Price: ₹{parseFloat(selectedPackage?.price).toLocaleString()}</p>

            {bookingStatus && (
              <p
                style={{
                  margin: "10px 0",
                  color: bookingStatus.includes("success") ? "green" : "red",
                }}
              >
                {bookingStatus}
              </p>
            )}

            <form className="booking-form">
              <input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                name="email"
                placeholder="Your Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                name="phone"
                placeholder="Your Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                placeholder="Any additional message"
                value={formData.message}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={bookingStatus.includes("progress")}
              >
                Proceed to Checkout
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default HealthCheckup;