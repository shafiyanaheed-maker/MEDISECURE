import React from "react";
import "../styles/RoleSelection.css";

function RoleSelection({
  onPatient,
  onStaff,
  darkMode,
  toggleTheme,
}) {
  return (
   <div
    className={`role-page ${
        darkMode ? "dark" : "light"
    }`}
>

      {/* Top Bar */}

      <div className="top-navbar">

        <div className="brand-section">
          <div className="brand-logo"></div>

          <div>
            <h1>MediSecure</h1>
            <p>HEALTHCARE IoT SYSTEM</p>
          </div>
        </div>

        <div className="theme-box">

          <span>Light</span>

          <label className="toggle">

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

      {/* Heading */}

      <div className="heading-section">

        <div className="welcome-badge">
          WELCOME
        </div>

        <h1>
          Choose Your Portal
        </h1>

        <div className="ecg-line"></div>

        <p>
          Select the portal that best matches your role to continue
        </p>

      </div>

      {/* Cards */}

      <div className="portal-wrapper">

        {/* Patient */}

        <div className="portal-card">

          <div className="card-image patient-bg">

            <div className="overlay-circle"></div>

          </div>

          <div className="card-content">

            <h2>Patient Portal</h2>

            <p>
              Access your health records, prescriptions,
              laboratory reports and personal information securely.
            </p>

            <button onClick={onPatient}>
              Enter Patient Portal →
            </button>

          </div>

        </div>

        {/* Staff */}

        <div className="portal-card">

          <div className="card-image staff-bg">

            <div className="overlay-circle"></div>

          </div>

          <div className="card-content">

            <h2>Hospital Staff Portal</h2>

            <p>
              Secure access for doctors, nurses and
              hospital staff to manage patient information.
            </p>

            <button onClick={onStaff}>
              Enter Staff Portal →
            </button>

          </div>

        </div>

      </div>

      {/* Bottom Info */}

      <div className="security-section">

        <div className="security-box">

          <h3>Advanced Security</h3>

          <p>
            All healthcare data is encrypted and
            protected using secure authentication.
          </p>

        </div>

        <div className="security-box">

          <h3>Authorized Access</h3>

          <p>
            Only authorized healthcare personnel can
            access sensitive patient information.
          </p>

        </div>

      </div>

      {/* Footer */}

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

export default RoleSelection;