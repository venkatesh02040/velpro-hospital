// Loader.jsx
import React from 'react';
import './Loader.css';

import hospitalLogo from '/velpro-fav.png'; // your logo path

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="logo-wrapper">
        <div className="behind-glow" />
        <img
          src={hospitalLogo}
          alt="Hospital Logo"
          className="hospital-logo"
        />
      </div>
    </div>
  );
};

export default Loader;