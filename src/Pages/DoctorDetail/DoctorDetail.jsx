import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./DoctorDetail.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import api from "../../Api/Api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formatTime12Hour = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");
  const date = new Date();
  date.setHours(Number(hour), Number(minute), 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const DoctorDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    disease: "",
    date: "",
    message: "",
    department_id: "",
    doctor_id: "",
    payment_method: "",
    schedule_id: "",
    gender: "",
    time: "",           // controls <select> value
    paymentMode: "",    // added missing field
  });

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

  // ────────────────────────────────────────────────
  // Fetch slots + auto-select first slot
  // ────────────────────────────────────────────────
  useEffect(() => {
    // Reset when date or doctor changes / clears
    if (!formData.date || !doctor?.id) {
      setSlots([]);
      setFormData((prev) => ({ ...prev, time: "", schedule_id: "" }));
      return;
    }

    let isCurrent = true;

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);

        const res = await api.get(`/api/check-timings/${doctor.id}/${formData.date}/`);

        const merged = [
          ...res.data.monthly_timings.map((t) => ({
            id: t.uuid || t.id,
            label: `${formatTime12Hour(t.start_time)} - ${formatTime12Hour(t.end_time)}`,
          })),
          ...res.data.weekly_timings.map((t) => ({
            id: t.uuid || t.id,
            label: `${formatTime12Hour(t.start_time)} - ${formatTime12Hour(t.end_time)}`,
          })),
        ];

        if (!isCurrent) return;

        setSlots(merged);

        // Auto-select first available slot
        if (merged.length > 0) {
          const firstSlot = merged[0];
          setFormData((prev) => ({
            ...prev,
            time: firstSlot.id,
            schedule_id: firstSlot.id,
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            time: "",
            schedule_id: "",
          }));
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
        if (isCurrent) {
          setSlots([]);
          setFormData((prev) => ({ ...prev, time: "", schedule_id: "" }));
        }
      } finally {
        if (isCurrent) setLoadingSlots(false);
      }
    };

    fetchSlots();

    return () => {
      isCurrent = false;
    };
  }, [formData.date, doctor?.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name?.trim();
    const email = formData.email?.trim();
    const phone_number = formData.phone_number?.trim();
    const gender = formData.gender;
    const disease = formData.disease?.trim();
    const message = formData.message?.trim();
    const date = formData.date;
    const scheduleId = formData.schedule_id;   // ← use schedule_id
    const department = doctor?.department;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name) return toast.error("Name is required");
    if (!email) return toast.error("Email is required");
    if (!emailRegex.test(email)) return toast.error("Invalid email");
    if (!phone_number) return toast.error("Phone number is required");
    if (!phoneRegex.test(phone_number)) return toast.error("Phone number must be 10 digits");
    if (!gender) return toast.error("Gender is required");
    if (!disease) return toast.error("Symptoms / disease is required");
    if (!date) return toast.error("Date is required");
    if (!scheduleId) return toast.error("Please select a time slot");
    if (!department) return toast.error("Doctor department missing");

    const payload = {
      name,
      email,
      phone_number,
      gender,
      disease,
      date,
      message,
      department,
      selected_doctor: doctor.id,
      schedule_id: scheduleId,
      payment_method: formData.paymentMode === "Pay Now" ? "online" : "pay_at_hospital",
      registration_fee: "off",
    };

    try {
      setBookingLoading(true);
      const res = await api.post("/api/create-appointment/", payload);
      const appointmentId = res.data.appointment_id;
      toast.success("Appointment booked successfully");
      navigate(`/success/${appointmentId}`);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Failed to book appointment";
      toast.error(msg);
    } finally {
      setBookingLoading(false);
    }
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

      <section className="doctor-hero" style={{ backgroundImage: `url("/DOCTORS-BANNER.jpeg")` }}>
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
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="tel"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Phone Number"
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
                  <select id="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="disease">Disease / Concern</label>
                  <input
                    type="text"
                    id="disease"
                    value={formData.disease}
                    onChange={handleChange}
                    placeholder="Enter disease or concern"
                    required
                  />
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
                    value={formData.time || ""}
                    onChange={handleChange}
                    required
                    disabled={loadingSlots || !formData.date}
                    className="modern-select"
                  >
                    <option value="" disabled>
                      {loadingSlots
                        ? "Loading available slots..."
                        : !formData.date
                        ? "Select a date first"
                        : slots.length === 0
                        ? "No slots available"
                        : "Select a time slot"}
                    </option>

                    {slots.map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.label}
                      </option>
                    ))}
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
                    <option value="">Select Payment Mode</option>
                    <option value="Pay at Hospital">Pay at Hospital</option>
                    <option value="Pay Now" disabled>Pay Now (Online)</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label htmlFor="message">Reason / Symptoms (optional)</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your concern..."
                  />
                </div>

                <PrimaryButton
                  text={bookingLoading ? "Booking..." : "Confirm Appointment"}
                  type="submit"
                  fullWidth
                  disabled={bookingLoading}
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DoctorDetail;