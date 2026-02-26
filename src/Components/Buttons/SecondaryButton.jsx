import React from "react";
import {FiArrowRight} from "react-icons/fi";
import "./SecondaryButton.css";


const SecondaryButton = ({ text = " ", onClick }) => {
  return (
    <div className="main-secondary-btn-wrapper">
      <button className="main-secondary-btn" onClick={onClick}>
        <span>{text}</span>
        <span className="arrow"><FiArrowRight /></span>
      </button>
    </div>
  );
};

export default SecondaryButton;
