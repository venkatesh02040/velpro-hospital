// src/pages/BlogDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiCalendar,
  FiMessageCircle,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import api from "../../Api/Api";
import "./BlogDetails.css";
import Navbar from "../../Components/Navbar/Navbar";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Footer from "../../Components/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";

// Import your custom animated Loader (same path as other pages)
import Loader from "../../Components/Loader/Loader";

const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Comment form states
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch current blog + related data
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

        // 2. Fetch departments for sidebar
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

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setCommentForm((prev) => ({ ...prev, rating }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (commentForm.rating === 0) {
      toast.error("Please select a rating (1–5 stars)");
      return;
    }

    setCommentLoading(true);

    try {
      const payload = {
        name: commentForm.name.trim(),
        email: commentForm.email.trim(),
        rating: commentForm.rating,
        message: commentForm.message.trim(),
      };

      await api.post(`/api/blogs/${slug}/comment/`, payload);

      toast.success("Comment posted successfully", {
        duration: 5000,
        position: "top-center",
      });

      // Reset form
      setCommentForm({
        name: "",
        email: "",
        rating: 0,
        message: "",
      });

      setBlog((prev) => ({
        ...prev,
        comment_count: prev.comment_count + 1,
      }));
    } catch (err) {
      console.error("Failed to post comment:", err);
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to post comment. Please try again.";
      toast.error(errorMsg, {
        duration: 6000,
        position: "top-center",
      });
    } finally {
      setCommentLoading(false);
    }
  };

  const getInitial = (name) => {
    if (!name || typeof name !== "string" || name.trim() === "") return "?";
    return name.trim().charAt(0).toUpperCase();
  };

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
                  <div className="comment-avatar-initial">
                    {getInitial(comment.name)}
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

            {/* Comment Form – with rating */}
            <div className="comment-form">
              <h3 style={{ marginBottom: "18px" }}>Leave A Comment</h3>
              <form onSubmit={handleCommentSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={commentForm.name}
                      onChange={handleCommentChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={commentForm.email}
                      onChange={handleCommentChange}
                      required
                    />
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label>Rating</label>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        size={28}
                        className={`star ${commentForm.rating >= star ? "filled" : ""}`}
                        onClick={() => handleRatingClick(star)}
                        style={{ cursor: "pointer", marginRight: "8px" }}
                      />
                    ))}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>Comment</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Write your comment here..."
                    value={commentForm.message}
                    onChange={handleCommentChange}
                    required
                  ></textarea>
                </div>

                <div className="primary-btn">
                  <PrimaryButton
                    text={commentLoading ? "Posting..." : "Post Comment"}
                    disabled={commentLoading}
                  />
                </div>
              </form>
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
                <div key={post.id} className="recent-post"
                onClick={() => navigate(`/blogs/${post.slug}`)}
                >
                  {console.log(post)}
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

      {/* Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: "16px",
            padding: "16px",
            borderRadius: "10px",
          },
          success: {
            style: {
              background: "#d1fae5",
              color: "#065f46",
              border: "1px solid #34d399",
            },
          },
          error: {
            style: {
              background: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #f87171",
            },
          },
        }}
      />
    </div>
  );
};

export default BlogDetail;