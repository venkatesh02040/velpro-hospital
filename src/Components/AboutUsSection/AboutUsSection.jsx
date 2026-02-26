// AboutUsSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import './AboutUsSection.css';

const Counter = ({ end, duration = 2800, suffix = '+' }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let startTime = Date.now();
                        const animate = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            // Smooth ease-out cubic
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const current = Math.floor(eased * end);
                            setCount(current);

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                setCount(end);
                            }
                        };
                        animate();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.6 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <span ref={countRef} className="counter-number">
            {count.toLocaleString()}
            {suffix}
        </span>
    );
};

const AboutUsSection = () => {
    return (
        <section className="about-us-section">
            <div className="container">
                <div className="about-wrapper">
                    {/* Left Image Panel */}
                    <div className="left-panel">
                        <img
                            src="https://picsum.photos/id/1015/800/920"
                            alt="Cardiologist examining patient"
                            className="left-image"
                        />
                    </div>

                    {/* Content Panel */}
                    <div className="content-panel">
                        <div className="about-badge">About Us</div>

                        <h2 className="main-heading">
                            Advancing Excellence In <span className="highlight">Multi-Speciality Healthcare.</span>
                        </h2>

                        <p className="description">
                            Delivering expert medical care across surgical and speciality departments with advanced technology, experienced specialists, and a patient-focused approach that ensures safe procedures, accurate diagnosis, personalized treatment, and faster recovery for every patient.
                        </p>


                        {/* Stats */}
                        <div className="stats">
                            <div className="stat">
                                <div className="stat-label">01. Patients</div>
                                <div className="stat-value">
                                    <Counter end={1200} />
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-label">02. Surgeries</div>
                                <div className="stat-value">
                                    <Counter end={100} />
                                </div>
                            </div>
                        </div>

                        {/* Primary Button */}
                        <Link to="/about">
                            <PrimaryButton text="Discover More" />
                        </Link>

                    </div>

                    {/* Right Image Panel */}
                    <div className="right-panel">
                        <img
                            src="https://picsum.photos/id/669/520/620"
                            alt="Senior patient consultation"
                            className="right-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;