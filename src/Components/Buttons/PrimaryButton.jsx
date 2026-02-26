import React from "react";
import {FiArrowRight} from "react-icons/fi";
import "./PrimaryButton.css";


const PrimaryButton = ({ text = " ", onClick }) => {
  return (
    <div className="main-primary-btn-wrapper">
      <button className="main-primary-btn" onClick={onClick}>
        <span>{text}</span>
        <span className="arrow"><FiArrowRight /></span>
      </button>
    </div>
  );
};

export default PrimaryButton;
