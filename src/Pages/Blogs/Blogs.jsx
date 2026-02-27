// src/pages/Blog.jsx (or wherever it lives)
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import "./Blog.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import api from "../../Api/Api";

// Import your custom Loader
import Loader from "../../Components/Loader/Loader";  // adjust path if needed

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/blogs/");

        setBlogs(response.data || []);
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setError("Unable to load blogs right now. Please try again later.");
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
      <>
        <Navbar />
        <section className="blog-banner">
          <div className="blog-banner-content">
            <h1>Blogs</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span><span>Blogs</span>
            </div>
          </div>
        </section>

        <div className="blog-loading-wrapper">
          <Loader />
        </div>

        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <section className="blog-banner">
          <div className="blog-banner-content">
            <h1>Blogs</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span><span>Blogs</span>
            </div>
          </div>
        </section>

        <div className="blog-error-wrapper">
          <p className="error-message">{error}</p>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {/* BLOG BANNER */}
      <section className="blog-banner">
        <div className="blog-banner-content">
          <h1>Blogs</h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span><span>Blogs</span>
          </div>
        </div>
      </section>

      {/* BLOG CARDS */}
      <section className="blog-section">
        <div className="blog-container">
          {blogs.length === 0 ? (
            <div className="no-blogs-message">
              No blogs available at the moment.
            </div>
          ) : (
            blogs.map((blog) => {
              const { day, monthYear } = formatDate(blog.createdAt);

              // Map backend fields to your component's expected names
              const mappedBlog = {
                id: blog.id,
                title: blog.heading,
                image: blog.image,
                date: blog.createdAt,
                admin: blog.author,
                comments: blog.comment_count || 0,
              };

              return (
                <div key={blog.id} className="blog-card" onClick={() => navigate(`/blogs/${blog.slug}`)}>
                  {/* IMAGE */}
                  <div className="blog-image-wrapper">
                    <img src={mappedBlog.image} alt={mappedBlog.title} />

                    {/* DATE BADGE */}
                    <div className="blog-date-badge">
                      <h3>{day}</h3>
                      <span>{monthYear}</span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span>
                        <FaUserAlt className="meta-icon" />
                        {mappedBlog.admin}
                      </span>

                      {mappedBlog.comments > 0 && (
                        <span>
                          <BiCommentDetail className="meta-icon" />
                          Comments ({mappedBlog.comments})
                        </span>
                      )}
                    </div>

                    <h3>{mappedBlog.title}</h3>

                    <button
                      className="blog-read-btn"
                      onClick={() => navigate(`/blogs/${blog.slug}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;