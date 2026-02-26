// CareerDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./CareerDetail.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";

// Same mock data
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

const CareerDetail = () => {
    const { slug } = useParams();
    const [job, setJob] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
    });

    useEffect(() => {
        const foundJob = mockCareers.find((j) => j.slug === slug);
        setJob(foundJob || null);
    }, [slug]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setFormData((prev) => ({ ...prev, resume: file }));
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission (API call placeholder)
        console.log("Form submitted:", formData);
        alert("Application submitted successfully!");
        // Reset form
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            coverLetter: "",
            resume: null,
        });
    };

    if (!job) {
        return (
            <>
                <Navbar />
                <div className="not-found">
                    <h2>Job Not Found</h2>
                    <p>The requested position could not be located.</p>
                    <Link to="/careers" className="back-link">
                        ← Back to Careers
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className="detail-hero">
                <div className="detail-hero-content">
                    <h1>{job.position}</h1>
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> <span>/</span> <Link to="/careers">Careers</Link> <span>/</span> <span>{job.position}</span>
                    </div>
                </div>
            </section>

            <section className="detail-main">
                <div className="detail-container">
                    <h2 className="detail-title">Job Details</h2>

                    <div className="detail-info">
                        <p><strong>Position:</strong> {job.position}</p>
                        <p><strong>Department:</strong> {job.department}</p>
                        <p><strong>Experience Required:</strong> {job.experience_required}</p>
                        <p><strong>Salary:</strong> {job.salary}</p>
                        <p><strong>Qualification:</strong> {job.qualification}</p>
                        <p><strong>Posted Date:</strong> {job.posted_date}</p>
                    </div>

                    <div className="rich-section">
                        <h3>Job Summary</h3>
                        <div className="rich-text"
                            dangerouslySetInnerHTML={{ __html: job.job_summary }} />
                    </div>

                    <div className="rich-section">
                        <h3>Responsibilities</h3>
                        <div className="rich-text"
                            dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
                    </div>

                    <div className="rich-section">
                        <h3>Skills Required</h3>
                        <div className="rich-text"
                            dangerouslySetInnerHTML={{ __html: job.skills_required }} />
                    </div>

                    <div className="apply-form">
                        <h2>Apply for this Position</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="coverLetter">Cover Letter</label>
                                <textarea
                                    id="coverLetter"
                                    name="coverLetter"
                                    value={formData.coverLetter}
                                    onChange={handleInputChange}
                                    placeholder="Write your cover letter here"
                                    rows="6"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="resume">Resume (PDF only)</label>
                                <input
                                    type="file"
                                    id="resume"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>

                            <PrimaryButton text="Submit Application" type="submit" fullWidth />
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default CareerDetail;