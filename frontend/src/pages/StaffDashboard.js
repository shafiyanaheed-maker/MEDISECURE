import React, { useState } from "react";
import "../styles/StaffDashboard.css";
import axios from "axios";
import { useEffect } from "react";
import StaffRegistration from "../components/StaffRegistration";


import PatientSearch from "../components/PatientSearch";
import PatientWorkspace from "../components/PatientWorkspace";
import PatientRegistration from "../components/PatientRegistration";
import DoctorRegistration from "../components/DoctorRegistration";

function StaffDashboard({
    staff,
    darkMode,
    toggleTheme
}) {

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showStaffRegistration, setShowStaffRegistration] = useState(false);

  const [stats,setStats]=useState({

    todayRegistrations:0,

    totalPatients:0,

    totalDoctors:0,

    pendingEnrollments:0

});
useEffect(() => {

    fetchStats();

}, []);

const fetchStats=async()=>{

    try{

        const response=await axios.get(

            "http://localhost:5000/api/dashboard/staff-stats"

        );

        setStats(response.data);

    }

    catch(err){

        console.log(err);

    }

};

  const [showPatientRegistration, setShowPatientRegistration] = useState(false);

  const [showDoctorRegistration, setShowDoctorRegistration] = useState(false);

  return (

    <div
    className={`staff-dashboard ${
        darkMode ? "dark-dashboard" : "light-dashboard"
    }`}
>

     <div className="staff-header">

    <div className="staff-title">

        <h1>MediSecure</h1>

        <p>Hospital Staff Dashboard</p>

        <h2 style={{marginTop:"18px"}}>
            Welcome, {staff.full_name}
        </h2>

    </div>

   <div className="staff-right">

    <button
        className="theme-btn"
        onClick={toggleTheme}
    >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>

    <button
        className="logout-btn"
        onClick={()=>window.location.reload()}
    >
        Logout
    </button>

</div>
</div>

<div className="stats-grid">

    <div className="stat-card">

        <h3>Today's Registrations</h3>

        <h1>{stats.todayRegistrations}</h1>

    </div>

    <div className="stat-card">

        <h3>Total Patients</h3>

        <h1>{stats.totalPatients}</h1>

    </div>

    <div className="stat-card">

        <h3>Total Doctors</h3>

        <h1>{stats.totalDoctors}</h1>

    </div>

    <div className="stat-card">

        <h3>Pending Enrollments</h3>

        <h1>{stats.pendingEnrollments}</h1>

    </div>

</div>

<div className="staff-info-card">

    <div className="staff-info-grid">

        <div>

            <strong>Staff ID</strong>

            <p>{staff.staff_unique_id}</p>

        </div>

        <div>

            <strong>Email</strong>

            <p>{staff.email}</p>

        </div>

        <div>

            <strong>Department</strong>

            <p>{staff.department}</p>

        </div>

        <div>

            <strong>Designation</strong>

            <p>{staff.designation}</p>

        </div>

    </div>

</div>
!selectedPatient &&
!showPatientRegistration &&
!showDoctorRegistration &&
!showStaffRegistration (

      <>

    <div className="staff-info-card">

        <h2 style={{ marginBottom: "20px" }}>
            🔍 Search Patient
        </h2>

        <PatientSearch
            onSelect={setSelectedPatient}
        />

    </div>

    <div className="staff-actions">

        <div
            className="action-card"
            onClick={() => setShowPatientRegistration(true)}
        >

            <h2>➕ Register Patient</h2>

            <p>
                Create a new patient profile with
                Patient ID, fingerprint and face data.
            </p>

        </div>

        <div
            className="action-card"
            onClick={() => setShowDoctorRegistration(true)}
        >

            <h2>👨‍⚕️ Register Doctor</h2>

            <p>
                Add a new doctor and assign
                department and specialization.
            </p>

        </div>
        <div
    className="action-card"
    onClick={() => setShowStaffRegistration(true)}
>

    <h2>👩‍💼 Register Staff</h2>

    <p>

        Add a new hospital staff member.

    </p>

</div>

    </div>

</>

      )
      {showStaffRegistration && (

<>

<button
className="back-btn"
onClick={() => setShowStaffRegistration(false)}
>

⬅ Back

</button>

<StaffRegistration
darkMode={darkMode}
/>

</>

)}

      {showPatientRegistration && (

        <>

          <button
            className="back-btn"
            onClick={() => setShowPatientRegistration(false)}
          >
            ⬅ Back
          </button>

          <PatientRegistration
    darkMode={darkMode}
/>

        </>

      )}

      {showDoctorRegistration && (

        <>

          <button
            onClick={() => setShowDoctorRegistration(false)}
          >
            ⬅ Back
          </button>

      <DoctorRegistration
    darkMode={darkMode}
/>

        </>

      )}

      {selectedPatient && (

        <>

          <button
            onClick={() => setSelectedPatient(null)}
          >
            ⬅ Back
          </button>

          <div style={{ marginTop: "30px" }}>

    <PatientWorkspace
        patientId={selectedPatient}
    />

</div>

        </>

      )}

    </div>

  );

}

export default StaffDashboard;