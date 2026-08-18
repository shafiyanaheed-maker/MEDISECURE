import React from "react";
import "../styles/LandingPage.css";

import logo from "../assets/logo.png";
import hospitalBg from "../assets/hospital-bg.png";

function LandingPage({ onEnter, darkMode, toggleTheme }) {
  return (
    <div className={`landing-page ${darkMode ? "dark-mode" : ""}`}>

      {/* Background Effects */}
      <div className="network-bg"></div>

      <img
        src={hospitalBg}
        alt="Hospital"
        className="hospital-bg"
      />

      {/* Theme Toggle */}

      <div className="theme-toggle">

        <span>☀️ Light</span>

        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>

        <span>🌙 Dark</span>

      </div>

      {/* Main Content */}

      <div className="content-container">

        <img
          src={logo}
          alt="Logo"
          className="main-logo"
        />

        <h2 className="medi-title">
          Medi_Secure
        </h2>

        <h1 className="title">
          Secure Authentication and Authorization
          <br />
          Framework for Healthcare IoT Systems
        </h1>

        <div className="tagline-section">

          <div className="line"></div>

          <p className="tagline">
            Secure • Smart • Reliable Healthcare Access
          </p>

          <div className="line"></div>

        </div>

        <button
          className="enter-btn"
          onClick={onEnter}
        >
          ➜ Enter Application
        </button>

      </div>

      {/* Cards */}

      <div className="cards-container">

        <div className="card">

          <div className="icon blue">
            🔒
          </div>

          <h3>Secure Authentication</h3>

          <p>
            Multi-factor authentication using
            Patient ID, Fingerprint and future
            Face Recognition.
          </p>

          <div className="bottom-line blue-line"></div>

        </div>

        <div className="card">

          <div className="icon green">
            📋
          </div>

          <h3>Digital Health Records</h3>

          <p>
            Secure access to medical history,
            prescriptions, laboratory reports
            and healthcare information.
          </p>

          <div className="bottom-line green-line"></div>

        </div>

        <div className="card">

          <div className="icon purple">
            🏥
          </div>

          <h3>Smart Hospital Access</h3>

          <p>
            Fast patient identification for
            authorized hospital staff during
            routine care and emergencies.
          </p>

          <div className="bottom-line purple-line"></div>

        </div>

      </div>

      {/* Footer */}

      <footer className="footer">

        <p>
          Developed for Secure Healthcare IoT Systems
        </p>

        <p>
          Version 1.0
        </p>

      </footer>

    </div>
  );
}

export default LandingPage;