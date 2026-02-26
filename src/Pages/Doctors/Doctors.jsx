import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { FiSearch } from "react-icons/fi";
import api from "../../Api/Api";   // your axios instance (baseURL = http://192.168.0.130:8000/)
import "./Doctors.css";

const Doctors = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]); // real departments
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch real data from your backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch doctors
        const doctorsRes = await api.get("/api/doctors/");
        setDoctors(doctorsRes.data || []);

        // 2. Fetch departments (for filter buttons + dropdown)
        const deptsRes = await api.get("/api/departments/");
        setDepartments(deptsRes.data || []);

        // Set initial filtered list
        setFilteredDoctors(doctorsRes.data || []);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic (same as your original)
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

  // Top 5 departments for filter buttons (real data)
  const topFiveDepartments = departments.slice(0, 5).map((d) => d.title);

  // All departments + "All" for dropdown
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
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          Loading doctors...
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
                  <div className="doctors-avatar-wrapper">
                    <img src={doctor.photo} alt={doctor.name} />
                  </div>

                  <div className="doctor-main-details">
                    <h3 className="doctors-name">{doctor.name}</h3>

                    <div className="doctors-qualification">
                      {doctor.education}
                    </div>

                    {/* <span className="doctors-spec-badge">
                      {doctor.department_name.toUpperCase()}
                    </span> */}

                    <button
                      className="doctors-book-btn"
                      onClick={() => navigate(`/doctors/${doctor.slug}`)}
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