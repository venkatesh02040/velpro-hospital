import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./DepartmentDetail.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import api from "../../Api/Api";   // your axios instance

const DepartmentDetail = () => {
  const { slug } = useParams();
  const [department, setDepartment] = useState(null);
  const [sidebarDepartments, setSidebarDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current department detail (now includes doctors array)
        const deptResponse = await api.get(`/api/departments/${slug}/`);
        setDepartment(deptResponse.data);

        // Fetch all departments for sidebar
        const allDeptsResponse = await api.get("/api/departments/");
        setSidebarDepartments(allDeptsResponse.data || []);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Unable to load department details. Please try again.");
        setDepartment(null);
        setSidebarDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dept-loading">Loading department details...</div>
        <Footer />
      </>
    );
  }

  if (error || !department) {
    return (
      <>
        <Navbar />
        <div className="dept-not-found">
          <h2>Department Not Found</h2>
          <p>The requested department could not be located.</p>
          <Link to="/departments" className="back-link">
            ← Back to Departments
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // Real doctors are now inside department.doctors
  const relatedDoctors = department.doctors || [];

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      {/* Hero Banner */}
      <section
        className="dept-hero"
        style={{
          backgroundImage: department.breadcamp
            ? `url(${department.breadcamp})`
            : "none",
          backgroundColor: "#6d9cca", // fallback color – also used on mobile
        }}
      >
        <div className="d-hero-overlay"></div>
        <div className="d-hero-content">
          <div className="dept-icon-hero">
            <img
              src={department.icon || "/fallback-icon.png"}
              alt={`${department.title} icon`}
              className="icon-large"
            />
          </div>
          <h1 className="hero-title">{department.title}</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/departments">Departments</Link> <span>/</span>
            <span>{department.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="dept-main">
        <div className="dept-container">
          <div className="dept-content">
            <div className="dept-featured-image">
              <img
                src={department.banner}
                alt={department.title}
                className="featured-img"
              />
            </div>

            <h2 className="dept-heading">About {department.title}</h2>
            <div
              className="dept-rich-text"
              dangerouslySetInnerHTML={{ __html: department.description || "<p>No description available.</p>" }}
            />

            {/* Related Doctors Section – now using real data from API */}
            <div className="dept-doctors-section">
              <h2 className="section-heading">
                Our Specialists in {department.title}
              </h2>

              {relatedDoctors.length > 0 ? (
                <div className="doctors-grid">
                  {relatedDoctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="doctor-image"
                        onError={(e) => {
                          e.target.src = "/fallback-doctor.jpg"; // optional fallback
                        }}
                      />
                      <h3 className="doctor-name">{doctor.name}</h3>
                      <p className="doctor-qual">
                        {doctor.designation} • {doctor.experience_years} Years Exp
                      </p>
                      <Link
                        to={`/doctors/${doctor.slug}`}
                        className="doctor-link"
                      >
                        View Profile →
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-doctors">
                  Specialists will be listed soon. Please check back or contact us.
                </p>
              )}

              <div className="dept-cta" style={{ marginTop: "48px" }}>
                <Link to="/doctors">
                  <PrimaryButton text="View All Doctors" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar – unchanged */}
          <aside className="dept-sidebar">
            <div className="sidebar-card">
              <h3>Other Departments</h3>
              <ul className="departments-list">
                {sidebarDepartments.length === 0 ? (
                  <li className="sidebar-empty">No departments available</li>
                ) : (
                  sidebarDepartments.map((dept) => {
                    const isActive = dept.slug === slug;

                    return (
                      <li key={dept.slug}>
                        <Link
                          to={`/departments/${dept.slug}`}
                          className={`sidebar-dept-link ${isActive ? "active" : ""}`}
                        >
                          {dept.title}
                        </Link>
                      </li>
                    );
                  })
                )}
              </ul>
              <div style={{ marginTop: "20px" }}>
                <Link to="/departments">
                  <PrimaryButton text="View All Departments" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DepartmentDetail;