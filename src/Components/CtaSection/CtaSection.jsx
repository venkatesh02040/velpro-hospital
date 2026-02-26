import React from "react";
import { Link } from "react-router-dom";
import "./CtaSection.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";

const CtaSection = ({
    heading = "Ready to Get Started?",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    primaryButtonText = "Get Started",
    primaryButtonLink = "/contact",
    secondaryButtonText = null,
    secondaryButtonLink = null,
    backgroundImage = null, // optional: pass URL like "https://images.unsplash.com/..."
    overlayColor = "rgba(29, 41, 89, 0.75)", // default dark blue overlay
    className = "", // optional extra classes
}) => {
    return (
        <section
            className={`cta-section ${className}`}
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            }}
        >
            <div className="cta-overlay" style={{ background: overlayColor }}></div>

            <div className="cta-content">
                <h2 className="cta-heading">{heading}</h2>
                <p className="cta-description">{description}</p>

                <div className="cta-buttons">
                    <Link to={primaryButtonLink}>
                        <PrimaryButton text={primaryButtonText} />
                    </Link>

                    {secondaryButtonText && secondaryButtonLink && (
                        <Link to={secondaryButtonLink}>
                            <SecondaryButton text={secondaryButtonText} />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CtaSection;