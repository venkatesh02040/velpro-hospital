import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./CareerDetail.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import api from "../../Api/Api";

const CareerDetail = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    cover_letter: "",
    cv: null,
  });

  const [submitStatus, setSubmitStatus] = useState(""); // success/error message

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/api/careers/${slug}/`);
        setJob(response.data);
      } catch (err) {
        console.error("Failed to load job detail:", err);
        setError("Unable to load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, cv: file }));
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job) return;

    try {
      setSubmitStatus("Submitting application...");

      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("number", formData.number);
      formPayload.append("email", formData.email);
      formPayload.append("job", job.id);           // ← sends job ID
      formPayload.append("cover_letter", formData.cover_letter);
      if (formData.cv) {
        formPayload.append("cv", formData.cv);     // ← file field name matches backend
      }

      const response = await api.post("/api/career/apply/", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitStatus("Application submitted successfully!");
      alert("Thank you! Your application has been submitted.");
      
      // Reset form
      setFormData({
        name: "",
        number: "",
        email: "",
        cover_letter: "",
        cv: null,
      });
    } catch (err) {
      console.error("Application failed:", err);
      setSubmitStatus(
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to submit application. Please try again or contact HR."
      );
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="not-found">
          <h2>Loading Job Details...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !job) {
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
          <h1>{job.job_title}</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <Link to="/careers">Careers</Link> <span>/</span> <span>{job.job_title}</span>
          </div>
        </div>
      </section>

      <section className="detail-main">
        <div className="detail-container">
          <h2 className="detail-title">Job Details</h2>

          <div className="detail-info">
            <p><strong>Position:</strong> {job.job_title}</p>
            <p><strong>Department:</strong> {job.department}</p>
            <p><strong>Experience Required:</strong> {job.experience} years</p>
            <p><strong>Salary:</strong> ₹{parseFloat(job.salary).toLocaleString()}</p>
            <p><strong>Qualification:</strong> {job.qualifications}</p>
            <p><strong>Posted Date:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
          </div>

          <div className="rich-section">
            <h3>Job Summary</h3>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: job.job_summary }}
            />
          </div>

          <div className="rich-section">
            <h3>Responsibilities</h3>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: job.responsibilities }}
            />
          </div>

          <div className="rich-section">
            <h3>Skills Required</h3>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: job.skills }}
            />
          </div>

          <div className="apply-form">
            <h2>Apply for this Position</h2>

            {submitStatus && (
              <p
                style={{
                  marginBottom: "16px",
                  color: submitStatus.includes("success") ? "green" : "red",
                  fontWeight: "500",
                }}
              >
                {submitStatus}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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
                  name="number"           // ← changed to match backend
                  value={formData.number}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="cover_letter"     // ← changed to match backend
                  value={formData.cover_letter}
                  onChange={handleInputChange}
                  placeholder="Write your cover letter here"
                  rows="6"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cv">Resume / CV (PDF only)</label>
                <input
                  type="file"
                  id="cv"
                  name="cv"               // ← changed to match backend
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