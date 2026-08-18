import React from "react";

function LandingPage({ onEnter, darkMode, toggleTheme }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "linear-gradient(135deg,#e0f2fe,#dbeafe)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer",
          background: darkMode ? "#f8fafc" : "#1e293b",
          color: darkMode ? "#1e293b" : "#fff",
          fontWeight: "bold",
        }}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      {/* Main Card */}
      <div
        style={{
          background: darkMode
            ? "rgba(30,41,59,0.95)"
            : "rgba(255,255,255,0.95)",

          width: "700px",
          padding: "60px",
          borderRadius: "25px",
          textAlign: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ fontSize: "90px" }}>🏥</div>

        <h1
          style={{
            color: darkMode ? "#fff" : "#0f172a",
            marginTop: "20px",
            fontSize: "38px",
          }}
        >
          Secure Authentication and Authorization
          Framework for Healthcare IoT Systems
        </h1>

        <p
          style={{
            marginTop: "20px",
            color: darkMode ? "#cbd5e1" : "#475569",
            fontSize: "20px",
          }}
        >
          Secure • Smart • Reliable Healthcare Access
        </p>

        <button
          onClick={onEnter}
          style={{
            marginTop: "40px",
            padding: "18px 60px",
            border: "none",
            borderRadius: "40px",
            fontSize: "20px",
            cursor: "pointer",
            background: "#2563eb",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ENTER →
        </button>
      </div>
    </div>
  );
}

export default LandingPage;