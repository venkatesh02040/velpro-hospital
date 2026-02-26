import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import "./HomeBlogSection.css";
import PrimaryButton from "../Buttons/PrimaryButton";
import api from "../../Api/Api";   // ← your axios instance (adjust path if needed)

const HomeBlogSection = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/blogs?homepage=true");

        const sortedBlogs = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);

        setBlogs(sortedBlogs);
      } catch (err) {
        console.error("Failed to load blogs for homepage:", err);
        setError("Unable to load latest blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return { day: "??", monthYear: "" };
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const monthYear = dateObj.toLocaleDateString("en-US", {
      month: "long",
      year: "2-digit",
    });
    return { day, monthYear };
  };

  if (loading) {
    return (
      <section className="home-blog-section">
        <div className="home-blog-container">
          <div className="home-blog-header">
            <h2 className="home-blog-title">Latest Healthcare Insights</h2>
            <p className="home-blog-subtitle">Loading latest blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || blogs.length === 0) {
    return (
      <section className="home-blog-section">
        <div className="home-blog-container">
          <div className="home-blog-header">
            <h2 className="home-blog-title">Latest Healthcare Insights</h2>
            <p className="home-blog-subtitle">
              {error || "No blogs available at the moment."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="home-blog-section">
      <div className="home-blog-container">
        <div className="home-blog-header">
          <h2 className="home-blog-title">Latest Healthcare Insights</h2>
          <p className="home-blog-subtitle">
            Stay updated with tips, trends, and expert advice from our blog.
          </p>
        </div>

        <div className="home-blog-grid">
          {blogs.map((blog) => {
            const { day, monthYear } = formatDate(blog.createdAt);

            return (
              <div key={blog.id} className="home-blog-card">
                {/* Image + Date Badge */}
                <div className="home-blog-image-wrapper">
                  <img 
                    src={blog.image} 
                    alt={blog.heading} 
                    loading="lazy" 
                    onError={(e) => { e.target.src = "/fallback-blog.jpg"; }} // optional
                  />

                  <div className="home-blog-date-badge">
                    <h3>{day}</h3>
                    <span>{monthYear}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="home-blog-content">
                  <div className="home-blog-meta">
                    <span>
                      <FaUserAlt className="meta-icon" />
                      {blog.author || "Velpro Admin"}
                    </span>
                    {blog.comment_count > 0 && (
                      <span>
                        <BiCommentDetail className="meta-icon" />
                        {blog.comment_count}
                      </span>
                    )}
                  </div>

                  <h3 className="home-blog-card-title">{blog.heading}</h3>

                  <button
                    className="home-blog-read-btn"
                    onClick={() => navigate(`/blogs/${blog.slug}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Blogs button */}
        <div className="home-blog-footer" onClick={() => navigate("/blogs")}>
          <PrimaryButton text="View All Blogs" />
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;