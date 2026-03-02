// src/components/DepartmentSlider/DepartmentSlider.jsx
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../../Api/Api";   // ← your axios instance
import Loader from "../../Components/Loader/Loader"; 

import "./DepartmentSlider.css";

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-prev-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <span className="prev"><FiArrowLeft /></span>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow custom-next-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <span className="next"><FiArrowRight /></span>
    </div>
  );
};

const DepartmentSlider = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width <= 600)        setSlidesToShow(1);
      else if (width <= 1024)  setSlidesToShow(2);
      else                     setSlidesToShow(3);
    };

    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateSlides, 150);
    };

    updateSlides();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/departments?homepage=true");

        const sorted = response.data.sort(
          (a, b) => parseFloat(b.priority || 0) - parseFloat(a.priority || 0)
        );

        setDepartments(sorted);
      } catch (error) {
        console.error("Failed to load departments for slider:", error);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1025, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 601,  settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return (
      <div className="department-slider-section">
        <div className="ds-section-header">
          <h2>OUR DEPARTMENTS</h2>
          <h3>Specialties We Excel In</h3>
        </div>
        <div className="loader-container" style={{
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 0"
        }}>
          <Loader />
        </div>
      </div>
    );
  }

  if (departments.length === 0) {
    return (
      <div className="department-slider-section">
        <div className="ds-section-header">
          <h2>OUR DEPARTMENTS</h2>
          <h3>Specialties We Excel In</h3>
          <p>No departments available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="department-slider-section">
      <div className="ds-section-header">
        <h2 className="dep-badge"> <img src="/departments.png" width={"35px"} style={{paddingRight:"10px"}} alt="" /> OUR DEPARTMENTS</h2>
        <h3>Leading the Way in Specialized Healthcare</h3>
        <p>Experience advanced diagnostics, innovative treatments, and expert care across multiple disciplines.</p>
      </div>

      <div className="slider-wrapper">
        <Slider {...settings}>
          {departments.map((dept) => (
            <div key={dept.slug} className="slider-card-wrapper">
              <Link
                to={`/departments/${dept.slug}`}
                className="service-card-link"
              >
                <div className="service-card">
                  <div className="service-image-container">
                    <img
                      src={dept.banner}
                      alt={dept.title}
                      className="service-image"
                      onError={(e) => { e.target.src = "/fallback-department.jpg"; }}
                    />
                  </div>

                  <div className="service-content">
                    <div className="service-icon-wrapper">
                      <img
                        src={dept.icon}
                        alt={`${dept.title} icon`}
                        className="service-icon"
                        onError={(e) => { e.target.src = "/stomach.png"; }}
                      />
                    </div>

                    <h3 className="service-title">
                      {dept.title.length > 28
                        ? dept.title.substring(0, 25) + "..."
                        : dept.title}
                    </h3>

                    <div
                      className="service-description"
                      dangerouslySetInnerHTML={{
                        __html: dept.description
                          ? dept.description.length > 110
                            ? dept.description.substring(0, 107) + "..."
                            : dept.description
                          : "Specialized care in " + dept.title.toLowerCase() + "."
                      }}
                    />

                    <div className="learn-more">
                      Know More <FiArrowRight />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DepartmentSlider;