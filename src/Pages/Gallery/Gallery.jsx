import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";   // your axios instance
import "./Gallery.css";
import HomeBlogSection from "../../Components/HomeBlogSection/HomeBlogSection";
import CtaSection from "../../Components/CtaSection/CtaSection";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/galleries/");

        // Map API response to your expected format
        const formatted = response.data.map((item) => ({
          id: item.id,
          src: item.image,
          alt: item.title || "Gallery Image",
          caption: item.title || "Gallery Image",
        }));

        setGalleryImages(formatted);
      } catch (err) {
        console.error("Failed to load gallery images:", err);
        setError("Unable to load gallery images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <>
      <Navbar />

      {/* GALLERY BANNER */}
      <section className="gallery-banner">
        <div className="gallery-banner-content">
          <h1>Gallery</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Gallery</span>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="gallery-section">
        <div className="gallery-container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              Loading gallery...
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "red" }}>
              {error}
            </div>
          ) : galleryImages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              No gallery images available.
            </div>
          ) : (
            <div className="gallery-grid">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <div className="gallery-overlay">
                    <p className="gallery-caption">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="gallery-lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="lightbox-image"
            />
            <p className="lightbox-caption">{selectedImage.caption}</p>
          </div>
        </div>
      )}

      <CtaSection
        heading="Ready to Improve Your Health?"
        description="Book an appointment with our expert specialists today and take the first step towards better wellness."
        primaryButtonText="Book Appointment"
        primaryButtonLink="/doctors"
        secondaryButtonText="Learn More"
        secondaryButtonLink="/about"
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <HomeBlogSection />
      <Footer />
    </>
  );
};

export default Gallery;