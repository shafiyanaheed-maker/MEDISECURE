import React, { useState } from "react";
import axios from "axios";
import "../styles/DoctorLogin.css";

function DoctorLogin({
    onLogin,
    onBack,
    darkMode,
    toggleTheme
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctors/login",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

      onLogin(response.data.doctor);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

return (

<div className={`doctor-login-page ${darkMode ? "dark" : "light"}`}>

    <div className="theme-box">

        <span>☀️</span>

        <label className="toggle">

            <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleTheme}
            />

            <span className="slider"></span>

        </label>

        <span>🌙</span>

    </div>

    <button
        className="back-btn"
        onClick={onBack}
    >
        ← Back
    </button>

    <div className="doctor-login-card">

        <div className="doctor-logo">

            ⚕

        </div>

        <h1>MediSecure</h1>

        <p className="subtitle">

            Healthcare IoT System

        </p>

        <h2>Doctor Authentication</h2>

        <p className="description">

            Secure login for authorized medical staff

        </p>

        <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>

            Login Securely

        </button>

    </div>

</div>

);
}

export default DoctorLogin;