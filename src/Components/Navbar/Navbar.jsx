// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsX, BsChevronDown } from "react-icons/bs";

import "./Navbar.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import api from "../../Api/Api";

// Import your custom Loader component
import Loader from "../../Components/Loader/Loader";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // More
  const [departmentsOpen, setDepartmentsOpen] = useState(false); // Departments
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 1100);

  const [departments, setDepartments] = useState([]);           // ← Dynamic list
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const response = await api.get("/api/departments/");

        // Optional: filter only visible ones if needed
        // const visible = response.data.filter(d => d.show_on_homepage);
        setDepartments(response.data || []);
      } catch (error) {
        console.error("Failed to load departments for navbar:", error);
        setDepartments([]); // fallback to empty or static list
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // Screen width handling
  useEffect(() => {
    const handleResize = () => {
      const narrow = window.innerWidth < 1100;
      setIsNarrowScreen(narrow);
      if (narrow) {
        setDepartmentsOpen(false);
        setDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setDepartmentsOpen(false);
  }, [location.pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setDepartmentsOpen(false);
  };

  const toggleDepartments = (e) => {
    e.stopPropagation();
    setDepartmentsOpen((prev) => !prev);
  };

  const toggleMore = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Helper to split into columns of 5
  const chunkArray = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const departmentsColumns = chunkArray(departments, 5);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/velpro.jpg" alt="Hospital Logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar__links ${menuOpen ? "mobile-active" : ""}`}>
        <div className="mobile-close" onClick={closeMenu}>
          <BsX size={40} />
        </div>

        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>

        <li className={location.pathname === "/about" ? "active" : ""}>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </li>

        {/* Departments Dropdown */}
        <li
          className={`dropdown departments-dropdown ${location.pathname.startsWith("/departments") ? "active" : ""
            }`}
          onMouseEnter={!isNarrowScreen ? () => setDepartmentsOpen(true) : undefined}
          onMouseLeave={!isNarrowScreen ? () => setDepartmentsOpen(false) : undefined}
        >
          <button
            className="dropdown-toggle"
            onClick={toggleDepartments}
            style={{ fontFamily: "'Myriad Pro', sans-serif", paddingLeft: "4px" }}
          >
            Departments <BsChevronDown size={12} />
          </button>

          <ul className={`dropdown__menu departments__menu ${departmentsOpen ? "show" : ""}`}>
            {loadingDepartments ? (
              <div className="departments-loading-wrapper">
                <Loader />  {/* Your animated heartbeat logo */}
              </div>
            ) : departments.length === 0 ? (
              <div className="departments-empty">No departments available</div>
            ) : (
              <>
                <div className="departments-grid">
                  {departmentsColumns.map((column, colIndex) => (
                    <ul key={colIndex} className="departments-column">
                      {column.map((dept) => (
                        <li key={dept.slug}>
                          <Link
                            to={`/departments/${dept.slug}`}
                            onClick={closeMenu}
                          >
                            {dept.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>

                <div className="view-all-departments">
                  <Link to="/departments" onClick={closeMenu} className="view-all-link">
                    <PrimaryButton text="View All Departments" />
                  </Link>
                </div>
              </>
            )}
          </ul>
        </li>

        <li className={location.pathname === "/doctors" ? "active" : ""}>
          <Link to="/doctors" onClick={closeMenu}>Doctors</Link>
        </li>

        <li className={location.pathname === "/blogs" ? "active" : ""}>
          <Link to="/blogs" onClick={closeMenu}>Blogs</Link>
        </li>

        <li className={location.pathname === "/contact" ? "active" : ""}>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </li>

        {/* More Dropdown – unchanged */}
        <li
          className={`dropdown ${[
              "/appointments",
              "/health-checkup",
              "/homecare-services",
              "/facilities",
              "/gallery",
              "/newsletter",
              "/careers",
            ].includes(location.pathname)
              ? "active"
              : ""
            }`}
          onMouseEnter={!isNarrowScreen ? () => setDropdownOpen(true) : undefined}
          onMouseLeave={!isNarrowScreen ? () => setDropdownOpen(false) : undefined}
        >
          <button
            className="dropdown-toggle"
            onClick={toggleMore}
            style={{ fontFamily: "'Myriad Pro', sans-serif", paddingLeft: "4px" }}
          >
            More <BsChevronDown size={12} />
          </button>

          <ul className={`dropdown__menu ${dropdownOpen ? "show" : ""}`}>
            {/* <li onClick={() => { navigate("/appointments"); closeMenu(); }}>
              View Your Appointments
            </li> */}
            <li onClick={() => { navigate("/health-checkup"); closeMenu(); }}>
              Health Checkup
            </li>
            <li onClick={() => { navigate("/homecare-services"); closeMenu(); }}>
              Homecare Services
            </li>
            <li onClick={() => { navigate("/facilities"); closeMenu(); }}>
              Facilities
            </li>
            <li onClick={() => { navigate("/gallery"); closeMenu(); }}>
              Gallery
            </li>
            {/* <li onClick={() => { navigate("/newsletter"); closeMenu(); }}>
              View Newsletter
            </li> */}
            <li onClick={() => { navigate("/careers"); closeMenu(); }}>
              Careers
            </li>
          </ul>
        </li>

        <div className="mobile-cta">
          <Link to="/doctors" onClick={closeMenu}>
            <PrimaryButton text="Book Appointment" />
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;