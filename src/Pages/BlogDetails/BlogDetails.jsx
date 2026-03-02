// src/pages/BlogDetail.jsx (or wherever it lives)
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiUser,
  FiCalendar,
  FiMessageCircle,
  FiArrowRight,
} from "react-icons/fi";
import api from "../../Api/Api";
import "./BlogDetails.css";
import Navbar from "../../Components/Navbar/Navbar";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Footer from "../../Components/Footer/Footer";

// Import your custom Loader
import Loader from "../../Components/Loader/Loader";  // adjust path if needed

/* -------- DATE FORMATTER -------- */
const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch current blog + embedded data
        const blogRes = await api.get(`/api/blogs/${slug}/`);
        const data = blogRes.data;

        setBlog({
          image: data.image,
          author: data.author,
          date: data.createdAt,
          title: data.heading,
          content: data.content,
          comment_count: data.comment_count,
        });

        setComments(data.comments || []);
        setRecentPosts(data.latest_blogs || []);
        setTags(data.tags ? data.tags.split(",").map(t => t.trim()) : []);

        // 2. Fetch departments for sidebar (top 5)
        const deptsRes = await api.get("/api/departments/");
        const sorted = deptsRes.data.sort(
          (a, b) => parseFloat(a.priority) - parseFloat(b.priority)
        );
        setDepartments(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to load blog or departments:", err);
        setError("Unable to load blog details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="blog-detail-loading">
          <Loader />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="blog-detail-error">
          <h2>Blog Not Found</h2>
          <p>{error || "The requested blog could not be loaded."}</p>
          <Link to="/blogs" className="back-link">
            ← Back to Blogs
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="blog-detail-page">
        {/* Banner */}
        <div className="blog-banner">
          <div className="blog-banner-content">
            <h1>Blogs</h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span>
              <span>
                <Link to="/blogs">Blogs</Link>
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="blog-detail-container">
          {/* Left – Blog Content */}
          <div className="blog-detail-main">
            <img
              src={blog.image}
              alt={blog.title}
              className="blog-detail-main-image"
            />

            <div className="blog-detail-meta">
              <span>
                <FiUser /> {blog.author}
              </span>
              <span>
                <FiCalendar /> {formatDate(blog.date)}
              </span>
              <span>
                <FiMessageCircle /> {blog.comment_count} Comments
              </span>
            </div>

            <h2 className="blog-detail-title">{blog.title}</h2>

            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="blog-detail-content"
            />

            {/* Comments */}
            <div className="comments-section">
              <h3>
                {blog.comment_count < 10
                  ? `0${blog.comment_count}`
                  : blog.comment_count}{" "}
                Comments
              </h3>

              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="default-avatar">
                    <FiUser
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#f4f6fb",
                        padding: "5px",
                        border: "1px solid #1e295a",
                        borderRadius: "50%",
                      }}
                      size={25}
                    />
                  </div>

                  <div>
                    <h4 style={{ marginBottom: "4px" }}>{comment.name}</h4>
                    <span style={{ fontSize: "12px" }}>
                      {formatDate(comment.created_at)}
                    </span>
                    <p style={{ marginTop: "6px" }}>{comment.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <div className="comment-form">
              <h3 style={{ marginBottom: "10px" }}>Leave A Comment</h3>
              <p>Your email address will not be published.</p>

              <div className="form-grid">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email Address" />
              </div>

              <textarea placeholder="Comment"></textarea>

              <div className="primary-btn">
                <PrimaryButton text="Post Comment" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="blog-detail-sidebar">
            {/* Departments */}
            <div className="sidebar-card">
              <h4>Departments</h4>
              {departments.map((dept) => (
                <Link
                  key={dept.slug}
                  to={`/departments/${dept.slug}`}
                  className="sidebar-link"
                >
                  <FiArrowRight />
                  {dept.title}
                </Link>
              ))}
            </div>

            {/* Recent Posts */}
            <div className="sidebar-card">
              <h4>Recent Posts</h4>
              {recentPosts.map((post) => (
                <div key={post.id} className="recent-post">
                  <img src={post.image} alt={post.heading} />
                  <div>
                    <p
                      style={{
                        marginTop: "0px",
                        marginBottom: "8px",
                        fontWeight: "600",
                      }}
                    >
                      {post.heading}
                    </p>
                    <span>
                      <FiCalendar
                        style={{ position: "relative", top: "1px" }}
                      />{" "}
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="sidebar-card">
              <h4>Popular Tags</h4>
              <div className="tags">
                {tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;