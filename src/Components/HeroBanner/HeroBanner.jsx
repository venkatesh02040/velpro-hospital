// src/components/HeroBanner/HeroBanner.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./HeroBanner.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import api from "../../Api/Api";

// Import your custom Loader component
// Adjust path if your folder structure is different
import Loader from "../../Components/Loader/Loader";   // ← most common path based on your previous components

const HeroBanner = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef(null);

  // Fetch banners once on mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/banners/");

        // Map API response to expected format
        const formatted = response.data.map((banner) => ({
          id: banner.id,
          image: banner.image_for_desktop,
          mobileImage: banner.image_for_mobile,
          heading: banner.heading,
          description: banner.description,
          btn1Text: banner.button_text,
          btn1Link: banner.button_url,
          btn2Text: banner.button_two_text,
          btn2Link: banner.button_two_url,
        }));

        setSlides(formatted);
      } catch (err) {
        console.error("Failed to load banners:", err);
        // You can keep slides empty or add fallback static slides here if desired
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto slide
  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    timeoutRef.current = setTimeout(nextSlide, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused, slides.length]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (loading) {
    return (
      <section className="hero-banner">
        <div 
          style={{ 
            height: "90vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.4)", // optional subtle overlay for better contrast
          }}
        >
          <Loader />
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null; // or show a fallback static banner if preferred
  }

  return (
    <section
      className="hero-banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`hero-slide ${index === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              '--mobile-image': `url(${slide.mobileImage || slide.image})`,
            }}
          >
            <div className="hero-overlay" />

            <div className="hero-content">
              <h1>{slide.heading}</h1>
              <p>{slide.description}</p>

              <div className="hero-buttons">
                <Link to={slide.btn1Link} style={{ textDecoration: 'none' }}>
                  <PrimaryButton text={slide.btn1Text} />
                </Link>

                {slide.btn2Text && slide.btn2Link && (
                  <Link to={slide.btn2Link} style={{ textDecoration: 'none' }}>
                    <SecondaryButton text={slide.btn2Text} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="nav-arrow prev" onClick={prevSlide}>
        <BsChevronLeft size={28} />
      </button>
      <button className="nav-arrow next" onClick={nextSlide}>
        <BsChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;