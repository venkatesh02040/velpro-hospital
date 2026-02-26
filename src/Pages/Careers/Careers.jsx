// Careers.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Careers.css";

const mockCareers = [
  {
    position: "Staff Nurse",
    department: "Nursing",
    experience_required: "1-3 years",
    salary: "3-5 LPA",
    qualification: "B.Sc Nursing / GNM",
    posted_date: "2024-10-01",
    job_summary: "<p>Provide compassionate patient care and assist doctors in clinical procedures.</p>",
    responsibilities: "<ul><li>Monitor patient vitals</li><li>Administer medications</li><li>Maintain medical records</li></ul>",
    skills_required: "<ul><li>Patient Care</li><li>Clinical Knowledge</li><li>Communication Skills</li></ul>",
    slug: "staff-nurse"
  },
  {
    position: "General Physician",
    department: "General Medicine",
    experience_required: "2-5 years",
    salary: "12-18 LPA",
    qualification: "MBBS with valid medical license",
    posted_date: "2024-09-20",
    job_summary: "<p>Diagnose and treat a wide range of medical conditions in outpatient and inpatient settings.</p>",
    responsibilities: "<ul><li>Examine patients</li><li>Prescribe treatments</li><li>Coordinate with specialists</li></ul>",
    skills_required: "<ul><li>Clinical Diagnosis</li><li>Patient Management</li><li>Medical Documentation</li></ul>",
    slug: "general-physician"
  },
  {
    position: "Lab Technician",
    department: "Pathology",
    experience_required: "1-4 years",
    salary: "2.5-4 LPA",
    qualification: "Diploma/B.Sc in Medical Laboratory Technology",
    posted_date: "2024-09-10",
    job_summary: "<p>Conduct laboratory tests and ensure accurate reporting of diagnostic results.</p>",
    responsibilities: "<ul><li>Collect samples</li><li>Perform lab tests</li><li>Maintain lab equipment</li></ul>",
    skills_required: "<ul><li>Lab Procedures</li><li>Attention to Detail</li><li>Equipment Handling</li></ul>",
    slug: "lab-technician"
  },
  {
    position: "Pharmacist",
    department: "Pharmacy",
    experience_required: "2-4 years",
    salary: "3-6 LPA",
    qualification: "B.Pharm / D.Pharm with license",
    posted_date: "2024-08-28",
    job_summary: "<p>Dispense medications and counsel patients on proper drug usage.</p>",
    responsibilities: "<ul><li>Review prescriptions</li><li>Dispense medicines</li><li>Manage inventory</li></ul>",
    skills_required: "<ul><li>Pharmaceutical Knowledge</li><li>Inventory Management</li><li>Communication</li></ul>",
    slug: "pharmacist"
  },
  {
    position: "Hospital Administrator",
    department: "Administration",
    experience_required: "4-7 years",
    salary: "8-14 LPA",
    qualification: "MBA in Hospital Administration / Healthcare Management",
    posted_date: "2024-08-15",
    job_summary: "<p>Oversee daily hospital operations and ensure efficient healthcare service delivery.</p>",
    responsibilities: "<ul><li>Manage staff</li><li>Supervise operations</li><li>Ensure regulatory compliance</li></ul>",
    skills_required: "<ul><li>Leadership</li><li>Operations Management</li><li>Healthcare Regulations</li></ul>",
    slug: "hospital-administrator"
  }
];

const Careers = () => {
  return (
    <>
      <Navbar />
      <section className="careers-hero">
        <div className="careers-hero-content">
          <h1>Careers</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Careers</span>
          </div>
        </div>
      </section>

      <section className="careers-main">
        <div className="careers-container">
          <h2 className="careers-title">Join Our Team</h2>
          <p className="careers-subtitle">Explore exciting opportunities to grow your career with us.</p>

          <div className="positions-list">
            {mockCareers.map((job) => (
              <div key={job.slug} className="position-card">
                <h3 className="position-name">{job.position}</h3>
                <p className="position-dept">Department: {job.department}</p>
                <p className="position-exp">Experience Required: {job.experience_required}</p>
                <Link to={`/careers/${job.slug}`} className="view-btn">
                  View Position
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Careers;