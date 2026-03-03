// src/pages/Doctors.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FiSearch } from "react-icons/fi";
import api from "../../Api/Api";
import "./Doctors.css";
import Loader from "../../Components/Loader/Loader";  // adjust path if needed

const Doctors = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const doctorsRes = await api.get("/api/doctors/");
        setDoctors(doctorsRes.data || []);

        const deptsRes = await api.get("/api/departments/");
        setDepartments(deptsRes.data || []);

        setFilteredDoctors(doctorsRes.data || []);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let results = [...doctors];

    if (selectedDept !== "All") {
      results = results.filter((doc) => doc.department_name === selectedDept);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter((doc) =>
        doc.name.toLowerCase().includes(query)
      );
    }

    setFilteredDoctors(results);
  }, [selectedDept, searchQuery, doctors]);

  const topFiveDepartments = departments.slice(0, 5).map((d) => d.title);
  const allDepartmentsForDropdown = ["All", ...departments.map((d) => d.title)];

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="doctors-banner">
          <div className="doctors-banner-content">
            <h1>Doctors</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span>Doctors</span>
            </div>
          </div>
        </section>

        <div className="doctors-loading-wrapper">
          <Loader />
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="doctors-banner">
        <div className="doctors-banner-content">
          <h1>Doctors</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Doctors</span>
          </div>
        </div>
      </section>

      <section className="doctors-main-section">
        <div className="doctors-container">
          <div className="doctors-controls">
            <div className="doctors-filters">
              {topFiveDepartments.map((dept) => (
                <button
                  key={dept}
                  className={`doctors-filter-btn ${selectedDept === dept ? "active" : ""}`}
                  onClick={() => setSelectedDept(dept)}
                >
                  {dept}
                </button>
              ))}

              <select
                className="doctors-dept-dropdown"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {allDepartmentsForDropdown.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="doctors-search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search doctor by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="doctors-grid">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="doctors-card">
                  <div 
                    className="doctors-avatar-wrapper"
                    onClick={() => navigate(`/doctors/${doctor.slug}`)}
                  >
                    <img 
                      src={doctor.photo} 
                      alt={`${doctor.name} - ${doctor.education || "Doctor"}`}
                      onError={(e) => (e.target.src = "/fallback-doctor.jpg")}
                    />
                  </div>

                  <div className="doctor-main-details">
                    <h3 
                      className="doctors-name"
                      onClick={() => navigate(`/doctors/${doctor.slug}`)}
                    >
                      {doctor.name}
                    </h3>

                    <div className="doctors-qualification">
                      {doctor.education || "Specialist"}
                    </div>

                    <button
                      className="doctors-book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctors/${doctor.slug}`);
                      }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="doctors-no-results">No doctors found.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Doctors;