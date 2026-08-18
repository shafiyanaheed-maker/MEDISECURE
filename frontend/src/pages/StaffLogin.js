import React, { useState } from "react";
import axios from "axios";
import "../styles/StaffLogin.css";

function StaffLogin({
  darkMode,
  toggleTheme,
  onBack,
  onLogin
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/staff/login",
        {
          email,
          password
        }
      );

      alert(response.data.message);

      onLogin(response.data.staff);

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }

    }

  };

  return (

<div className={`staff-login-page ${darkMode ? "dark" : "light"}`}>

    <button
        className="staff-back-btn"
        onClick={onBack}
    >
        ← Back
    </button>
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

    <div className="staff-login-card">

        <h1>MediSecure</h1>

        <h2>Hospital Staff Login</h2>

        <input
            className="staff-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />

        <input
            className="staff-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
        />

        <button
            className="staff-login-btn"
            onClick={handleLogin}
        >
            Login
        </button>

    </div>

</div>

);

}

export default StaffLogin;