import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShieldAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./DoctorsSection.css";
import api from "../../Api/Api";   // ← your axios instance (adjust path if needed)

const DoctorsSection = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [slidesConfig, setSlidesConfig] = useState({
    slidesToShow: 3,
    centerPadding: "80px",
  });

  // Fetch real doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/doctors/");

        // Sort by priority descending (highest first) and take first 6
        const sortedDoctors = response.data
          .sort((a, b) => parseFloat(b.priority || 0) - parseFloat(a.priority || 0))
          .slice(0, 6);

        setDoctors(sortedDoctors);
      } catch (error) {
        console.error("Failed to load doctors for homepage:", error);
        setDoctors([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Responsive config
  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setSlidesConfig({ slidesToShow: 1, centerPadding: "30px" });
      } else if (width <= 900) {
        setSlidesConfig({ slidesToShow: 2, centerPadding: "50px" });
      } else if (width <= 1100) {
        setSlidesConfig({ slidesToShow: 3, centerPadding: "60px" });
      } else {
        setSlidesConfig({ slidesToShow: 3, centerPadding: "80px" });
      }
    };

    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateConfig, 150);
    };

    updateConfig();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: slidesConfig.slidesToShow,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: slidesConfig.centerPadding,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1100, settings: { slidesToShow: 3, centerPadding: "60px" } },
      { breakpoint: 900, settings: { slidesToShow: 2, centerPadding: "50px" } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerPadding: "30px", arrows: false },
      },
    ],
  };

  // Touch handling to pause/resume autoplay
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let timeoutId = null;

    const resumeAutoplay = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (slider && slider.innerSlider) {
          slider.slickPlay();
        }
      }, 800);
    };

    const handleTouchStart = () => {
      if (slider && slider.innerSlider) {
        slider.slickPause();
      }
    };

    const handleTouchEnd = () => resumeAutoplay();

    const sliderElement = document.querySelector(".doc-slider-outer");

    if (sliderElement) {
      sliderElement.addEventListener("touchstart", handleTouchStart);
      sliderElement.addEventListener("touchend", handleTouchEnd);
      sliderElement.addEventListener("touchcancel", handleTouchEnd);
    }

    if (window.innerWidth <= 640 && slider?.innerSlider) {
      slider.slickPlay();
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener("touchstart", handleTouchStart);
        sliderElement.removeEventListener("touchend", handleTouchEnd);
        sliderElement.removeEventListener("touchcancel", handleTouchEnd);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleNavigate = (slug) => navigate(`/doctors/${slug}`);

  if (loading) {
    return (
      <section className="doc-hero-section">
        <div className="doc-container">
          <div className="doc-header">
            <span className="doc-tag">
              <FaShieldAlt size={24} /> OUR EXPERT DOCTORS
            </span>
            <h2 className="doc-title">Meet Our Specialists</h2>
            <p className="doc-subtitle">Loading our expert doctors...</p>
          </div>
        </div>
      </section>
    );
  }

  if (doctors.length === 0) {
    return (
      <section className="doc-hero-section">
        <div className="doc-container">
          <div className="doc-header">
            <span className="doc-tag">
              <FaShieldAlt size={24} /> OUR EXPERT DOCTORS
            </span>
            <h2 className="doc-title">Meet Our Specialists</h2>
            <p className="doc-subtitle">No doctors available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="doc-hero-section">
      <div className="doc-container">
        <div className="doc-header">
          <span className="doc-tag">
            <FaShieldAlt size={24} /> OUR EXPERT DOCTORS
          </span>
          <h2 className="doc-title">Meet Our Specialists</h2>
          <p className="doc-subtitle">
            Highly qualified surgeons and doctors delivering compassionate, cutting-edge care.
          </p>
        </div>

        <div className="doc-slider-outer">
          <Slider ref={sliderRef} {...settings}>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doc-slide">
                <div className="doc-card">
                  <div className="doc-img-container">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="doc-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/fallback-doctor.jpg";
                      }}
                    />
                  </div>
                  <div className="doc-content">
                    <h3 className="doc-name">{doctor.name}</h3>
                    <p className="doc-spec">{doctor.department_name}</p>
                    <button
                      className="doc-book-btn"
                      onClick={() => handleNavigate(doctor.slug)}
                    >
                      Book Appointment
                    </button>
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

const PrevArrow = ({ className, style, onClick }) => (
  <button
    className={`${className} doc-arrow doc-arrow-left`}
    style={{ ...style }}
    onClick={onClick}
    aria-label="Previous doctor"
  >
    <FiChevronLeft size={28} />
  </button>
);

const NextArrow = ({ className, style, onClick }) => (
  <button
    className={`${className} doc-arrow doc-arrow-right`}
    style={{ ...style }}
    onClick={onClick}
    aria-label="Next doctor"
  >
    <FiChevronRight size={28} />
  </button>
);

export default DoctorsSection;