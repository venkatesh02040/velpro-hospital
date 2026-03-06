import { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaCalendarAlt, FaPlus } from "react-icons/fa";
import "./FloatingContact.css";

const FloatingContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="floating-container">
      
      {open && (
        <>
          <a href="tel:+918904740505" className="floating-btn call">
            <FaPhoneAlt />
          </a>

          <a
            href="https://wa.me/918904740505"
            target="_blank"
            rel="noreferrer"
            className="floating-btn whatsapp"
          >
            <FaWhatsapp size={26} />
          </a>

          <a href="/doctors" className="floating-btn appointment">
            <FaCalendarAlt />
          </a>
        </>
      )}

      <button
        className={`floating-btn main ${open ? "rotate" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FaPlus />
      </button>

    </div>
  );
};

export default FloatingContact;