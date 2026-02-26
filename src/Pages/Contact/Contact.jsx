import React from "react";
import { Link } from "react-router-dom";
import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import "./Contact.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";

const Contact = () => {
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

                            <form className="contact-form">
                                <div className="form">
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input type="text" placeholder="First Name" required />
                                    </div>

                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>E-Mail:</label>
                                        <input type="email" placeholder="E-Mail" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input type="tel" placeholder="Phone" required />
                                    </div>
                                </div>



                                <div className="form-group full-width">
                                    <label>Message:</label>
                                    <textarea
                                        rows="6"
                                        placeholder="Write A Message..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="submit-btn">
                                    <PrimaryButton text="Send Message" />
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
        </>
    );
};

export default Contact;