import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";
import api from "../../Api/Api";   // ← adjust path to your axios instance
import "./FAQSection.css";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/faqs/");

        // Sort by priority (lower number = higher priority)
        const sortedFaqs = response.data.sort(
          (a, b) => parseFloat(a.priority || 999) - parseFloat(b.priority || 999)
        );

        setFaqs(sortedFaqs);
      } catch (err) {
        console.error("Failed to load FAQs:", err);
        setError("Unable to load FAQs at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq_section">
      <div className="faq_container">
        {/* LEFT SIDE */}
        <div className="faq_left">
          <span className="faq_badge">
            <FaQuestionCircle size={30} /> FAQ's
          </span>

          <h2>
            Clear Answers To Your <br /> Questions
          </h2>

          <p>
            We provide clear and transparent answers to help you better
            understand our medical services and treatments.
          </p>

          <div className="faq_image">
            <img
              src="/faq.jpg"
              alt="FAQ Section"
            />
          </div>
        </div>

        {/* RIGHT SIDE - FAQs */}
        <div className="faq_right">
          {loading ? (
            <div className="faq-loading">Loading FAQs...</div>
          ) : error ? (
            <div className="faq-error">{error}</div>
          ) : faqs.length === 0 ? (
            <div className="faq-empty">No FAQs available at the moment.</div>
          ) : (
            faqs.map((item, index) => (
              <div
                key={item.id}
                className={`faq_item ${activeIndex === index ? "active" : ""}`}
              >
                <div
                  className="faq_question"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4>{item.question} ?</h4>

                  <span className="faq_icon">
                    {activeIndex === index ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </span>
                </div>

                <div
                  className={`faq_answer ${activeIndex === index ? "show" : ""}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;