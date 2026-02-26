import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiUser,
  FiCalendar,
  FiMessageCircle,
  FiArrowRight,
} from "react-icons/fi";
import api from "../../Api/Api";   // your axios instance
import "./BlogDetails.css";
import Navbar from "../../Components/Navbar/Navbar";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Footer from "../../Components/Footer/Footer";

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
  const [departments, setDepartments] = useState([]); // ← real departments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch current blog
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
        // Optional: sort by priority if you want consistent order
        const sorted = deptsRes.data.sort(
          (a, b) => parseFloat(a.priority) - parseFloat(b.priority)
        );
        setDepartments(sorted.slice(0, 5)); // keep only top 5 like your original
      } catch (err) {
        console.error("Failed to load blog or departments:", err);
        setError("Unable to load blog details.");
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
        <div className="blog-detail-page">
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            Loading blog...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="blog-detail-page">
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <h2>Blog Not Found</h2>
            <p>{error || "The requested blog could not be loaded."}</p>
            <Link to="/blogs">← Back to Blogs</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="blog-detail-page">
        {/* ===== Banner ===== */}
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

        {/* ===== Main Section ===== */}
        <div className="blog-detail-container">
          {/* ===== LEFT 70% – Blog Content ===== */}
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

            {/* Render full content as HTML */}
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="blog-detail-content"
            />

            {/* ===== COMMENTS DISPLAY ===== */}
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
                        border: "1px solid #1d2959",
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

            {/* ===== COMMENT FORM ===== */}
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

          {/* ===== RIGHT 30% SIDEBAR ===== */}
          <div className="blog-detail-sidebar">
            {/* Departments – now real from API (top 5) */}
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

            {/* Recent Posts – from latest_blogs */}
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