import React, { useState } from "react";
import axios from "axios";
import "../styles/PatientLogin.css";

function PatientLogin({
  darkMode,
  toggleTheme,
  onBack,
  onLogin
}) {

  const [patientId, setPatientId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!patientId || !password) {
      alert("Please enter Patient ID and Password");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/patients/login",
        {
          patient_unique_id: patientId,
          password: password
        }
      );

      alert(response.data.message);

      if (onLogin) {
        onLogin(response.data.patient);
      }

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to connect to server.");
      }

    } finally {

      setLoading(false);

    }

  };
  const handleFingerprintLogin = async () => {

  try {

    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/fingerprint/login"
    );

    if (response.data.success) {

      alert("Fingerprint verified successfully!");

      if (onLogin) {
        onLogin(response.data.patient);
      }

    }

  } catch (error) {

    if (error.response) {

      alert(error.response.data.message);

    } else {

      alert("Unable to connect to fingerprint scanner.");

    }

  } finally {

    setLoading(false);

  }

};

  return (
    <div className={`patient-page ${darkMode ? "dark" : "light"}`}>

      {/* Top Navbar */}

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

      {/* Back Button */}

      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      {/* Header */}

      <div className="heading-section">

        <div className="welcome-badge">
          PATIENT PORTAL
        </div>

        <h1>Patient Authentication</h1>

        <div className="ecg-line"></div>

        <p>
          Securely access your healthcare records
        </p>

      </div>

      {/* Login Cards */}

      <div className="login-wrapper">

        {/* Patient Login */}

        <div className="login-card">

          <div className="card-top blue-bg"></div>

          <div className="card-content">

            <h2>Patient ID Login</h2>

            <input
              type="text"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </div>

        </div>

        {/* Fingerprint */}

        <div className="login-card">

          <div className="card-top green-bg"></div>

          <div className="card-content">

            <h2>Forgot Patient ID?</h2>

            <div className="auth-circle">
              FP
            </div>

            <p>
              Use fingerprint authentication as backup login.
            </p>

            <button
  onClick={handleFingerprintLogin}
  disabled={loading}
>
  {loading ? "Scanning..." : "Scan Fingerprint"}
</button>

          </div>

        </div>

        {/* Face Recognition */}

        <div className="login-card">

          <div className="card-top purple-bg"></div>

          <div className="card-content">

            <h2>Face Recognition</h2>

            <div className="auth-circle">
              FR
            </div>

            <p>
              Future Enhancement
            </p>

            <button disabled>
              Coming Soon
            </button>

          </div>

        </div>

      </div>

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

export default PatientLogin;