import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import "./Footer.css";
import api from "../../Api/Api";   // ← your axios instance (adjust path if needed)

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/departments/");

        // Optional: sort by priority if you want consistent order
        // const sorted = response.data.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority));

        // Take only first 7 (as in your original design)
        setDepartments(response.data.slice(0, 7));
      } catch (error) {
        console.error("Failed to load departments in footer:", error);
        setDepartments([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + Description */}
        <div className="footer-column footer-brand">
          <div className="footer-logo">
            <Link to="/">
              <img className="footer-logo-img" src="/velpro_white_logo.png" alt="Hospital Logo" />
            </Link>
          </div>
          <p className="footer-description">
            Velpro Hospital is a trusted multi-speciality healthcare center committed to delivering advanced medical care with compassion, clinical excellence, and patient-focused treatment for better health outcomes.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Velpro-Hospital/61588577412301/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/velprohospital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/velpro-hospitals/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com/channel/UCgNFuoaEsAzc02B1W9g3DEQ" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Departments – now dynamic, top 7 */}
        <div className="footer-column">
          <h4>Departments</h4>
          <ul className="footer-links">
            {loading ? (
              <li>Loading...</li>
            ) : departments.length === 0 ? (
              <li>No departments available</li>
            ) : (
              departments.map((dept) => (
                <li key={dept.slug}>
                  <Link to={`/departments/${dept.slug}`}>
                    {dept.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/doctors">Doctors</Link></li>
            <li><Link to="/blogs">Latest Blogs</Link></li>
            {/* <li><Link to="/appointments">Appointments</Link></li> */}
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact – clickable */}
        <div className="footer-column footer-contact">
          <h4>Contact</h4>
          <ul className="contact-list">
            <li>
              <a href="tel:+918904740505" className="contact-link">
                <FaPhoneAlt className="contact-icon" />
                <span>+91 8904740505</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@velprohealthcare.com" className="contact-link">
                <FaEnvelope className="contact-icon" />
                <span>info@velprohealthcare.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/5bMnJAG1h6pfFFxD6"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <FaMapMarkerAlt className="contact-icon" />
                <span>
                  415, 9th Main Rd, HRBR Layout 1st Block, HRBR Layout, Kalyan Nagar,
                  Bengaluru, Karnataka 560043
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>
            Copyright © {currentYear} velpro | All Rights Reserved
          </p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://thinkb.agency/"
              target="_blank"
              rel="noopener noreferrer"
              className="thinkb-link"
            >
              thinkB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;