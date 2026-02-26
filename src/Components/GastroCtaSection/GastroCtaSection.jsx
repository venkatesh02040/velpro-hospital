import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";
import { FiCalendar, FiArrowRight, FiPlay } from "react-icons/fi";
import "./GastroCtaSection.css";

const GastroCtaSection = () => {
  const navigate = useNavigate();

  const [showMainVideo, setShowMainVideo] = useState(false);
  const [showRightVideo, setShowRightVideo] = useState(false);

  return (
    <section className="gastro-cta-full-bg">
      {/* Full background looping video */}
      <div className="bg-video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
        >
          <source src="/hospital.mp4" type="video/mp4" />
          {/* Replace with your actual background video path */}
          <img
            src="https://images.unsplash.com/photo-1587372696128-15a6b47daa5c?q=80&w=1470&auto=format&fit=crop"
            alt="Background fallback"
            className="bg-fallback"
          />
        </video>
        <div className="bg-overlay"></div>
      </div>

      <div className="cta-content-container">
        {/* Left side - Text + CTA */}
        <div className="left-content">
          <span className="tag-btn">
            <FaHeadset size={24} /> Get in Touch
          </span>

          <h1 className="main-heading">
Advanced Care For Better Tomorrow
          </h1>

          <p className="description">
Experience comprehensive multi-speciality healthcare delivered by skilled specialists using modern technology and patient-focused treatment approaches, ensuring accurate diagnosis, safe procedures, and personalized care that supports faster recovery and long-term health outcomes.
          </p>

          <div className="action-buttons">
            <button
              className="btn-appointment"
              onClick={() => navigate("/doctors")}
            >
              <FiCalendar size={22} /> Get Appointment
            </button>

            <button
              className="btn-explore"
              onClick={() => navigate("/departments")}
            >
              Explore More <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Right side - Prominent video with play button */}
        <div className="right-video-area">
          {showRightVideo ? (
            <video
              autoPlay
            //   loop
              muted
              playsInline
              controls
              className="right-video"
            >
              <source src="/cta-video.mp4" type="video/mp4" />
              {/* Replace with your actual right-side video */}
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="video-placeholder">
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gastroenterology procedure"
                className="placeholder-img"
              />
              <button
                className="play-btn-large"
                onClick={() => setShowRightVideo(true)}
              >
                <FiPlay />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GastroCtaSection;