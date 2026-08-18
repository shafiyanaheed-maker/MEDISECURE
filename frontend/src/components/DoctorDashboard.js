import React, { useEffect, useState } from "react";
import PatientSearch from "./PatientSearch";
import PatientWorkspace from "./PatientWorkspace";
import "../styles/DoctorDashboard.css";
import axios from "axios";

function DoctorDashboard({
    doctor,
    darkMode,
    toggleTheme
}) {

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [stats, setStats] = useState({

    todayPatients: 0,

    totalVisits: 0,

    pendingFollowUps: 0,

    emergencyAlerts: 0

});

useEffect(() => {

    fetchDashboardStats();

}, []);

const fetchDashboardStats = async () => {

    try {

        const response = await axios.get(
            `http://localhost:5000/api/dashboard/doctor-stats/${doctor.doctor_id}`
        );

        setStats(response.data);

    }

    catch (error) {

        console.log(error);

    }

};

  return (
   <div
    className={`doctor-dashboard ${
        darkMode ? "dark-dashboard" : "light-dashboard"
    }`}
>

    <div className="dashboard-header">

    <div className="brand">

        <div className="brand-logo"></div>

        <div>
            <h1>MediSecure</h1>
            <p>Healthcare IoT System</p>
        </div>

    </div>

    <div className="header-actions">

        <button
            className="theme-toggle"
            onClick={toggleTheme}
        >
            {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button
            className="logout-btn"
            onClick={() => window.location.reload()}
        >
            Logout
        </button>

    </div>

</div>

{/* Welcome Section */}

<div
    style={{
        marginTop: "25px",
        marginBottom: "30px",
    }}
>
  <h2 className="welcome-title">
    👨‍⚕️ Welcome, {doctor?.full_name}
</h2>

<p className="welcome-subtitle">
    {doctor?.specialization}
</p>
<p className="welcome-text">

🏥 {doctor?.hospital_name}

</p>
</div>
<div className="stats-grid">

  <div className="stat-card">
    <h3>Today's Patients</h3>
    <h1>{stats.todayPatients}</h1>
  </div>

  <div className="stat-card">
    <h3>Total Visits</h3>
    <h1>{stats.totalVisits}</h1>
  </div>

  <div className="stat-card">
    <h3>Pending Follow-ups</h3>
    <h1>{stats.pendingFollowUps}</h1>
  </div>

  <div className="stat-card">
    <h3>Emergency Alerts</h3>
    <h1>{stats.emergencyAlerts}</h1>
  </div>

</div>



      <hr />

      {!selectedPatient ? (

        <div className="search-card">

    <div className="search-header">
        <h2>🔍 Search Patient</h2>

        <p>
            Enter the Patient ID to securely access the patient's medical records.
        </p>
    </div>

    <PatientSearch
        onSelect={setSelectedPatient}
    />

</div>

      ) : (

        <div>

          <button
            onClick={() => setSelectedPatient(null)}
            style={{
              padding: "10px 20px",
              marginBottom: "20px",
              cursor: "pointer"
            }}
          >
            ⬅ Back to Search
          </button>

          <PatientWorkspace
            patientId={selectedPatient}
            doctor={doctor}
          />

        </div>

      )}

    </div>
  );
}

export default DoctorDashboard;