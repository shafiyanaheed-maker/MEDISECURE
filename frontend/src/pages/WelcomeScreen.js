import React from "react";
import "../styles/WelcomeScreen.css";

function WelcomeScreen({
  darkMode,
  toggleTheme,
  onEnter
}) {

  return (

    <div className={`welcome-screen ${darkMode ? "dark" : "light"}`}>

      <div className="network-bg"></div>

      <div className="left-hospital"></div>

      <div className="right-security"></div>

      <div className="bottom-wave"></div>

      {/* Theme Toggle */}

      <div className="theme-box">

        <span>☀ Light</span>

        <label className="toggle">

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

      <div className="main-content">

        <div className="medical-logo">

          <span>⚕</span>

        </div>

        <h1 className="brand-name">
          MediSecure
        </h1>

        <p className="brand-subtitle">
          HEALTHCARE IoT SYSTEM
        </p>

        <h1 className="main-title">
  Secure Authentication and Authorization
  <br />
  Framework for Healthcare IoT Systems
</h1>

        <div className="tagline-container">

          <div className="tag-line"></div>

          <p>
            Secure • Smart • Reliable Healthcare Access
          </p>

          <div className="tag-line"></div>

        </div>

        <button
          className="enter-btn"
          onClick={onEnter}
        >
          Enter Application →
        </button>

      </div>

      {/* Feature Cards */}

      <div className="cards">

        <div className="card">

          <div className="card-icon blue">

            🔒

          </div>

          <h3>Secure Authentication</h3>

          <p>
            Multi-factor authentication using
            Patient ID, Fingerprint and Face
            Recognition for secure healthcare access.
          </p>

          <div className="card-line blue-line"></div>

        </div>

        <div className="card">

          <div className="card-icon green">

            ❤️

          </div>

          <h3>Smart Healthcare</h3>

          <p>
            Real-time patient monitoring,
            doctor consultation, sensor data
            and digital prescriptions in one system.
          </p>

          <div className="card-line green-line"></div>

        </div>

        <div className="card">

          <div className="card-icon purple">

            ☁️

          </div>

          <h3>Cloud Connected</h3>

          <p>
            Secure cloud storage with
            instant access to patient
            records from authorized hospitals.
          </p>

          <div className="card-line purple-line"></div>

        </div>

      </div>

      {/* Footer */}

      <footer className="footer">

        <div className="footer-shield">

          🛡️

        </div>

        <div className="footer-content">

          <div className="footer-divider"></div>

          <span>
            MediSecure Healthcare IoT System • 2026
          </span>

          <div className="footer-divider"></div>

        </div>

      </footer>

    </div>

  );

}

export default WelcomeScreen;