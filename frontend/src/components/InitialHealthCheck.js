import React, { useState } from "react";
import axios from "axios";
import "../styles/InitialHealthCheck.css";

function InitialHealthCheck({ patientId }) {

    const [vitals, setVitals] = useState({
        body_temperature: "",
        heart_rate: "",
        blood_pressure: "",
        spo2: "",
        height: "",
        weight: ""
    });

    const handleChange = (e) => {

        setVitals({
            ...vitals,
            [e.target.name]: e.target.value
        });

    };

    const saveAssessment = async () => {

        try {

            await axios.post(
                "http://localhost:5000/api/patients/initial-check",
                {
                    patient_unique_id: patientId,
                    ...vitals
                }
            );

            alert("✅ Initial Health Check Saved");

        }

        catch (err) {

            console.log(err);

            alert("Error Saving Assessment");

        }

    };

    return (

        <div className="health-card">

            <h2>🩺 Initial Health Check</h2>

            <div className="health-grid">

                <input
                    name="body_temperature"
                    placeholder="Temperature (°C)"
                    value={vitals.body_temperature}
                    onChange={handleChange}
                />

                <input
                    name="heart_rate"
                    placeholder="Heart Rate (BPM)"
                    value={vitals.heart_rate}
                    onChange={handleChange}
                />

                <input
                    name="blood_pressure"
                    placeholder="Blood Pressure"
                    value={vitals.blood_pressure}
                    onChange={handleChange}
                />

                <input
                    name="spo2"
                    placeholder="SpO₂ (%)"
                    value={vitals.spo2}
                    onChange={handleChange}
                />

                <input
                    name="height"
                    placeholder="Height (cm)"
                    value={vitals.height}
                    onChange={handleChange}
                />

                <input
                    name="weight"
                    placeholder="Weight (kg)"
                    value={vitals.weight}
                    onChange={handleChange}
                />

            </div>

            <button
                className="save-health-btn"
                onClick={saveAssessment}
            >
                Save Assessment
            </button>

        </div>

    );

}

export default InitialHealthCheck;