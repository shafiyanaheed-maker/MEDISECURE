import React, { useState } from "react";
import axios from "axios";
import "../styles/PatientSearch.css";

function PatientSearch({ onSelect }) {

  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState([]);

  const searchPatient = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/patients/search",
        {
          query,
        }
      );

      setPatients(response.data.patients);

    } catch (error) {

      console.log(error);

      alert("Patient not found");

      setPatients([]);

    }

  };

  return (

    <div>

      <div className="search-container">

        <input
          className="search-input"
          type="text"
          placeholder="Enter Patient ID or Name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="search-btn"
          onClick={searchPatient}
        >
          Search
        </button>

      </div>

      <hr className="search-divider" />

      {patients.map((patient) => (

        <div
          className="patient-card"
          key={patient.patient_id}
          onClick={() => onSelect(patient.patient_unique_id)}
        >

          <h3>{patient.full_name}</h3>

          <p><strong>Patient ID:</strong> {patient.patient_unique_id}</p>

          <p><strong>Age:</strong> {patient.age}</p>

          <p><strong>Gender:</strong> {patient.gender}</p>

          <p><strong>Phone:</strong> {patient.phone}</p>

          <p><strong>Blood Group:</strong> {patient.blood_group}</p>

        </div>

      ))}

    </div>

  );

}

export default PatientSearch;