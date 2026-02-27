import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";
import "./BookingSuccess.css";

const BookingSuccess = () => {
  const { id } = useParams();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await api.get(`/api/appointment/${id}/`);
        setAppointment(res.data);
      } catch (err) {
        console.error("Failed to fetch appointment", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="success-wrapper">
          <h2>Loading appointment details...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!appointment) {
    return (
      <>
        <Navbar />
        <div className="success-wrapper">
          <h2>Appointment not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="success-wrapper">
        <div className="success-card">
          <div className="success-icon"><FiCheck size={42} color="green" /></div>

          <h1 className="success-title">Appointment Confirmed</h1>
          <p className="success-subtitle">
            Your appointment has been successfully booked
          </p>

          <div className="success-details">
            <div className="detail-row">
              <span>Appointment ID</span>
              <strong>{appointment.id}</strong>
            </div>

            <div className="detail-row">
              <span>Name</span>
              <strong>{appointment.patient_name}</strong>
            </div>

            <div className="detail-row">
              <span>Doctor</span>
              <strong>{appointment.doctor_name}</strong>
            </div>

            <div className="detail-row">
              <span>Date & Time</span>
              <strong>
                {appointment.appointment_date} , {appointment.appointment_time}
              </strong>
            </div>

            <div className="detail-row">
              <span>Payment</span>
              <strong>{appointment.payment_method}</strong>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/" className="btn-primary">
              Go to Home
            </Link>

            <Link to="/doctors" className="btn-outline">
              Book Another
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookingSuccess;