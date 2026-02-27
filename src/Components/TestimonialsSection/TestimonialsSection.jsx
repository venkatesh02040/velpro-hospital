import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar, FaUserCircle, FaComments } from "react-icons/fa";
import api from "../../Api/Api";   // ← adjust path to your axios instance
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const sliderRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [slidesToShow, setSlidesToShow] = useState(3);

  // Responsive adjustment
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setSlidesToShow(1);
      } else if (width <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSlides, 150);
    };

    updateSlides();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch real testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/testimonials/");

        // Sort by priority (lower number = higher priority)
        const sorted = response.data.sort(
          (a, b) => parseFloat(a.priority || 999) - parseFloat(b.priority || 999)
        );

        setTestimonials(sorted);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Helper: Calculate "time ago" from created_at
  const getTimeAgo = (dateString) => {
    if (!dateString) return "Recently";

    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffDay >= 365) {
      const years = Math.floor(diffDay / 365);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
    } else if (diffDay >= 30) {
      const months = Math.floor(diffDay / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else if (diffDay >= 1) {
      return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`;
    } else if (diffHr >= 1) {
      return `${diffHr} ${diffHr === 1 ? "hour" : "hours"} ago`;
    } else if (diffMin >= 1) {
      return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  };

  const settings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 600,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="stars-row">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={`full-${i}`} className="star filled" />
          ))}

        {hasHalf && (
          <div className="half-star-wrapper">
            <FaStar className="star filled half" />
            <FaStar className="star empty half" />
          </div>
        )}

        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={`empty-${i}`} className="star empty" />
          ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="testi-section">
        <div className="testi-container">
          <div className="testi-header">
            <div className="testi-left">
              <span className="testi-label">
                <FaComments size={24} /> TESTIMONIALS
              </span>
              <h2 className="testi-title">Our happy clients say</h2>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            Loading testimonials...
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // or show empty state message if preferred
  }

  return (
    <section className="testi-section">
      <div className="testi-container">
        <div className="testi-header">
          <div className="testi-left">
            <span className="testi-label">
              <FaComments size={24} /> TESTIMONIALS
            </span>
            <h2 className="testi-title">Our happy clients say</h2>
          </div>

          {/* Custom arrows */}
          <div className="testi-arrows">
            <button
              className="testi-arrow-btn"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              className="testi-arrow-btn"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <FiChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="testi-slider-wrapper">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((t, idx) => (
              <div key={t.id} className="testi-slide">
                <div className="testi-card">
                  <div className="quote-top-right">“</div>

                  {renderStars(t.rating)}

                  <div className="testi-text-wrapper">
                    <p className="testi-text">{t.description}</p>
                  </div>

                  <div className="testi-footer">
                    <FaUserCircle className="testi-avatar" />
                    <div className="testi-user-info">
                      <h4 className="testi-name">{t.name}</h4>
                      <span className="testi-status">{getTimeAgo(t.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;