import React from "react";
import "../styles/StaffSelection.css";

function StaffSelection({
  onDoctor,
  onOtherStaff,
  darkMode,
  toggleTheme,
  onBack

}) {
  return (
    <div className={`staff-page ${darkMode ? "dark" : "light"}`}>

      {/* NAVBAR */}
      <button className="back-btn" onClick={onBack}>
            ← Back
        </button>

      <div className="staff-navbar">
        

        <div className="brand">

          <div className="brand-logo"></div>

          <div>
            <h1>MediSecure</h1>
            <p>HEALTHCARE IoT SYSTEM</p>
          </div>

        </div>

        <div className="theme-toggle">

          <span>Light</span>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>

          <span>Dark</span>

        </div>

      </div>

      {/* HEADER */}

      <div className="header">

        <div className="badge">
          STAFF PORTAL
        </div>

        <h1>Choose Staff Type</h1>

        <div className="line"></div>

        <p>
          Select your role to continue to the login or registration screen
        </p>

      </div>

      {/* CARDS */}

      <div className="cards">

        <div className="portal-card">

          <div className="card-top doctor-bg"></div>

          <div className="card-body">

            <h2>Doctor</h2>

            <p>
              Access patient records, diagnose,
              prescribe and manage treatment.
            </p>

            <button onClick={onDoctor}>
              Continue as Doctor →
            </button>

          </div>

        </div>

        <div className="portal-card">

          <div className="card-top staff-bg"></div>

          <div className="card-body">

            <h2>Other Hospital Staff</h2>

            <p>
              Manage patient information,
              appointments, reports and hospital operations.
            </p>

            <button onClick={onOtherStaff}>
              Continue as Staff →
            </button>

          </div>

        </div>

      </div>

      {/* SECURITY */}

      <div className="security-row">

        <div className="security-box">
          <h3>Advanced Security</h3>

          <p>
            All healthcare data is encrypted and protected.
          </p>
        </div>

        <div className="security-box">
          <h3>Authorized Access</h3>

          <p>
            Only authorized staff can access patient records.
          </p>
        </div>

      </div>

      {/* FOOTER */}

      <footer>

        <h3>
          Secure • Smart • Reliable Healthcare Access
        </h3>

        <p>
          © 2026 MediSecure Healthcare IoT System
        </p>

      </footer>

    </div>
  );
}

export default StaffSelection;