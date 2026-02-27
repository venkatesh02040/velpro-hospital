import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./About.css";
import HomeBlogSection from "../../Components/HomeBlogSection/HomeBlogSection";
import TestimonialsSection from "../../Components/TestimonialsSection/TestimonialsSection";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";

// Placeholder images – replace with real hospital/founder photos
const heroImage = "https://content3.jdmagicbox.com/v2/comp/bangalore/k7/080pxx80.xx80.250805175233.x3k7/catalogue/velpro-hospital-kalyan-nagar-bangalore-general-physician-doctors-djcmmkr0wr.jpg";
const founderData = [
    {
        name: "Dr. Srinivasa Rao",
        title: "Co-Founder & Chief Executive Officer",
        message:
            "With more than two decades of experience in advanced surgical and multi-specialty care, I founded this hospital with a clear vision: to combine world-class medical expertise with genuine human compassion. Every department from General & Laparoscopic Surgery to Neurosciences and Paediatrics is built around one core belief: patients deserve both precision and empathy.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Dr. Mahesh Gupta",
        title: "Co-Founder & Chief Medical Officer",
        message:
            "My journey has been focused on pushing the boundaries of minimally invasive techniques from Laser & Laparoscopic Surgery to Joint Replacements, Spine Surgery, and Arthroscopy. I believe the future of medicine lies in procedures that heal faster, hurt less, and restore life more completely. That philosophy guides every clinical decision we make.",
        image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Arjun Matre",
        title: "Co-Founder & Chief Technology Officer",
        message:
            "Technology should never replace the doctor-patient relationship it should enhance it. From intelligent appointment systems and digital patient records to telemedicine support for our Obstetrics & Gynaecology, Paediatrics, and Pain & Palliative Care departments, we are building infrastructure that makes high-quality care more accessible and seamless for every family we serve.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const statsData = [
    { 
        end: 1200, 
        label: "Patients Treated", 
        des: " Providing trusted and compassionate healthcare across multiple medical specialties." 
    },
    { 
        end: 100, 
        label: "Surgeries Performed", 
        des: " Delivering safe and advanced surgical care with precision and expertise." 
    },
    { 
        end: 125, 
        label: "Gastroenterology Procedures", 
        des: " Offering advanced diagnostic and therapeutic gastro care with modern technology." 
    },
    { 
        end: 75, 
        label: "In-Patients Cared For", 
        des: " Ensuring continuous monitoring and supportive care throughout recovery." 
    },
];

const About = () => {
    const navigate = useNavigate();
    const [counts, setCounts] = useState(statsData.map(() => 0));

    useEffect(() => {
        const duration = 2200;
        const steps = 60;
        const intervalTime = duration / steps;

        const timers = statsData.map((stat, idx) => {
            let current = 0;
            return setInterval(() => {
                current += stat.end / steps;
                if (current >= stat.end) {
                    current = stat.end;
                    clearInterval(timers[idx]);
                }
                setCounts((prev) => {
                    const updated = [...prev];
                    updated[idx] = Math.floor(current);
                    return updated;
                });
            }, intervalTime);
        });

        return () => timers.forEach(clearInterval);
    }, []);

    return (
        <>
            <Navbar />

            {/* Banner – same style as Doctors */}
            <section className="about-banner">
                <div className="about-banner-content">
                    <h1>About Us</h1>
                    <div className="breadcrumb">
                        <Link to="/">Home</Link> <span>/</span> <span>About Us</span>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-container">
                    <div className="about-hero-image">
                        <img src={heroImage} alt="Medical team consultation" />
                    </div>
                    <div className="about-hero-content">
                        <p className="about-hero-subtitle">Who We Are</p>
                        <h2>Committed To Advanced Patient Care</h2>
                        <p>
                            We are a trusted multi-speciality hospital focused on delivering modern healthcare through advanced medical technology, skilled specialists, and compassionate patient-centered care. With expertise across surgical and speciality departments, we provide comprehensive treatment solutions designed to ensure safety, accurate diagnosis, and improved recovery outcomes for patients of every age group.
                        </p>
                        <div className="about-hero-checks">
                            <ul>
                                <li><FiCheckCircle /> Advanced technology-driven treatment approach</li>
                                <li><FiCheckCircle /> Experienced multi-speciality medical experts</li>
                                <li><FiCheckCircle /> Strict patient safety protocols followed</li>
                                <li><FiCheckCircle /> Personalized care for every patient</li>
                            </ul>
                        </div>
                        <p className="about-hero-phone">
                            <a href="tel:+918904740505" className="contact-link" style={{ color: "#1e295a" }}>
                                <FaPhoneAlt className="contact-icon" color="#1e295a" />
                                <span>+91 8904740505</span>
                            </a>
                        </p>



                        <div onClick={() => navigate("/departments")}>
                            <PrimaryButton text="Know More" />
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="about-stats">
                <div className="about-stats-container">
                    {statsData.map((stat, i) => (
                        <div key={i} className="about-stat-item">
                            <h3>{counts[i]}+</h3>
                            <p>{stat.label}</p>
                            {/* <span>{stat.des}</span> */}
                        </div>
                    ))}
                </div>
            </section>

            {/* Founders – Big image + big message layout */}
            <section className="about-founders">
                <div className="about-founders-container">
                    <h2>Meet Our Founders</h2>

                    {founderData.map((founder, index) => (
                        <div key={index} className="about-founder-block">
                            <div className="about-founder-image">
                                <img src={founder.image} alt={founder.name} />
                            </div>
                            <div className="about-founder-message">
                                <h3>{founder.name}</h3>
                                <p className="founder-title">{founder.title}</p>
                                <p className="founder-text">{founder.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process Section (kept similar but cleaned) */}
            {/* Process Section */}
            <section className="about-process">
                <div className="about-process-container">
                    <p className="about-process-subtitle">Our Approach</p>
                    <h2>Patient Care Journey</h2>

                    <div className="about-process-timeline">
                        <div className="about-process-line"></div>

                        {[
                            {
                                num: "01",
                                title: "Patient Assessment",
                                description:
                                    "Comprehensive clinical evaluation to understand health conditions and plan appropriate care.",
                                image:
                                    "/p1.png", // Doctor consulting patient
                            },
                            {
                                num: "02",
                                title: "Precision Diagnosis",
                                description:
                                    "Advanced diagnostics ensuring accurate results for effective and timely treatment decisions.",
                                image:
                                    "/p2.png", // Lab / diagnostics / MRI
                            },
                            {
                                num: "03",
                                title: "Advanced Protocol",
                                description:
                                    "Evidence-based treatment delivered with medical expertise, safety, and patient-focused care.",
                                image:
                                    "/p3.png", // Surgery / procedure room
                            },
                            {
                                num: "04",
                                title: "Rehabilitation & Recovery",
                                description:
                                    "Continuous follow-up and recovery support to ensure long-term health and improved quality of life.",
                                image:
                                    "/p4.png", // Physiotherapy / recovery / smiling patient
                            },
                        ].map((step, index) => (
                            <div key={step.num} className="about-process-step">
                                <div className="about-process-step-circle">
                                    <img src={step.image} alt={step.title} loading="lazy" />
                                </div>
                                <div className="step-number" style={{
                                    fontSize: "20px",
                                    fontWeight: 600
                                }}>{step.num}</div>
                                <h4>{step.title}</h4>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div onClick={() => navigate("/doctors")}>
                        <PrimaryButton text="Schedule a Consultation" />
                    </div>
                </div>
            </section>

            <TestimonialsSection />
            <HomeBlogSection />


            <Footer />
        </>
    );
};

export default About;