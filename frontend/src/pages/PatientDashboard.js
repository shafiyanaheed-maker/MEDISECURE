import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PatientDashboard.css";

function PatientDashboard({
  patient,
  darkMode,
  toggleTheme,
  onBack,
}) {
  const [patientData, setPatientData] = useState(null);

  const [visits, setVisits] = useState([]);

  const [selectedVisit, setSelectedVisit] = useState(null);


  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!patient) return;

    loadPatient();

  }, [patient]);

  const loadPatient = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/patients/full/${patient.patient_unique_id}`
      );

      setPatientData(response.data.patient);

      setVisits(response.data.visits);

      if (response.data.visits.length > 0) {

        setSelectedVisit(response.data.visits[0]);

       

      }

      setLoading(false);

    } catch (err) {

      console.log(err);

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="loading-page">

        <h1>Loading Patient Dashboard...</h1>

      </div>

    );

  }

  return (

    <div className={`patient-dashboard ${darkMode ? "dark" : "light"}`}>

      {/* NAVBAR */}

      <div className="dashboard-navbar">

        <div className="brand">

          <div className="brand-logo"></div>

          <div>

            <h2>MediSecure</h2>

            <span>Healthcare IoT System</span>

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

      <div className="dashboard-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div>

          <div className="badge">
            PATIENT DASHBOARD
          </div>

          <h1>

            Welcome,

            {" "}

            {patientData.full_name}

          </h1>

          <p>

            Secure access to your healthcare information

          </p>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="dashboard-main">

        {/* PATIENT INFO */}

        <div className="card patient-card">

          <h2>👤 Personal Information</h2>

          <div className="info-row">

            <span>Patient ID</span>

            <strong>

              {patientData.patient_unique_id}

            </strong>

          </div>

          <div className="info-row">

            <span>Name</span>

            <strong>

              {patientData.full_name}

            </strong>

          </div>

          <div className="info-row">

            <span>Age</span>

            <strong>

              {patientData.age}

            </strong>

          </div>

          <div className="info-row">

            <span>Gender</span>

            <strong>

              {patientData.gender}

            </strong>

          </div>

          <div className="info-row">

            <span>Blood Group</span>

            <strong>

              {patientData.blood_group}

            </strong>

          </div>

          <div className="info-row">

            <span>Phone</span>

            <strong>

              {patientData.phone}

            </strong>

          </div>

          <div className="info-row">

            <span>Address</span>

            <strong>

              {patientData.address}

            </strong>

          </div>

        </div>
        {/* SELECTED VISIT */}

        <div className="card visit-card">

          <h2>📋 Selected Visit</h2>

          {selectedVisit ? (

            <>

              <div className="info-row">

                <span>Visit Date</span>

                <strong>
                  {new Date(
                    selectedVisit.visit_date
                  ).toLocaleDateString()}
                </strong>

              </div>

              <div className="info-row">

                <span>Symptoms</span>

                <strong>
                  {selectedVisit.symptoms}
                </strong>

              </div>
<div className="info-row">

    <span>🩺 Diagnosis</span>

    <strong>
        {selectedVisit.prescription?.diagnosis}
    </strong>

</div>

<div className="info-row">

    <span>Medicines</span>

    <strong>
        {selectedVisit.prescription?.medicines}
    </strong>

</div>

<div className="info-row">

    <span>Dosage</span>

    <strong>
        {selectedVisit.prescription?.dosage}
    </strong>

</div>

<div className="info-row">

    <span>Lab Tests</span>

    <strong>
        {selectedVisit.prescription?.laboratory_tests}
    </strong>

</div>

<div className="info-row">

    <span>Advice</span>

    <strong>
        {selectedVisit.prescription?.advice}
    </strong>

</div>

{/* ===== SENSOR READINGS ===== */}

{selectedVisit?.sensors?.length > 0 && (

<div className="sensor-card">

<h3>🩺 Sensor Readings</h3>

<div className="info-row">
<span>🌡 Temperature</span>
<strong>
{selectedVisit.sensors[0].body_temperature} °C
</strong>
</div>

<div className="info-row">
<span>❤️ Heart Rate</span>
<strong>
{selectedVisit.sensors[0].heart_rate} BPM
</strong>
</div>

<div className="info-row">
<span>🩸 Blood Pressure</span>
<strong>
{selectedVisit.sensors[0].blood_pressure}
</strong>
</div>

<div className="info-row">
<span>📈 ECG</span>
<strong>
{selectedVisit.sensors[0].ecg_value}
</strong>
</div>

<div className="info-row">
<span>🕒 Recorded Time</span>
<strong>
{new Date(
selectedVisit.sensors[0].recorded_at
).toLocaleString()}
</strong>
</div>

</div>

)}

<div className="info-row">

    
                <span>Follow-up</span>

                <strong>

                  {selectedVisit.prescription?.follow_up_date
                    ? new Date(
                        selectedVisit.prescription.follow_up_date
                      ).toLocaleDateString()
                    : "Not Scheduled"}

                </strong>

              </div>

            </>

          ) : (

            <p>No Visit Selected</p>

          )}

        </div>

        {/* SENSOR DETAILS */}

        

      </div>

      {/* TIMELINES */}

      <div className="timeline-container">
      {/* VISIT TIMELINE */}

        <div className="timeline-card">

          <h2>📅 Visit Timeline</h2>

          {visits.length > 0 ? (

            visits.map((visit) => (

              <div
                key={visit.visit_id}
                className={
                  selectedVisit?.visit_id === visit.visit_id
                    ? "timeline-item active"
                    : "timeline-item"
                }
          onClick={() => {

setSelectedVisit(visit);

}}
              >

               <h4>
  📅{" "}
  {new Date(visit.visit_date).toLocaleDateString("en-GB",{
      day:"2-digit",
      month:"short",
      year:"numeric"
  })}
</h4>

<p>🏥 {visit.hospital_name}</p>

<p>👨‍⚕️ {visit.doctor_name}</p>

<p>🩺 {visit.specialization}</p>

<p>
  🩺 {visit.prescription?.diagnosis || "Diagnosis Not Available"}
</p>

<p>
  💊 {visit.prescription?.medicines || "No Medicines"}
</p>

              </div>

            ))

          ) : (

            <p>No Visits Available</p>

          )}

        </div>

        {/* SENSOR TIMELINE */}


      </div>

      {/* FOOTER */}

      <footer className="dashboard-footer">

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

export default PatientDashboard;