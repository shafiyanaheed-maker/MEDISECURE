import React, { useEffect, useState } from "react";
import axios from "axios";
import AddVisit from "./AddVisit";
import "../styles/PatientWorkspace.css";

function PatientWorkspace({ patientId, doctor = null }) {

    const [data, setData] = useState(null);
    const [selectedVisit, setSelectedVisit] = useState(null);

    useEffect(() => {
        fetchPatient();
    }, [patientId]);
const fetchPatient = async () => {

    console.log("Fetching latest patient data...");

    try {

        const response = await axios.get(
            `http://localhost:5000/api/patients/full/${patientId}`
        );

        console.log("Latest visits count:", response.data.visits.length);

console.table(
    response.data.visits.map(v => ({
        id: v.visit_id,
        date: v.visit_date,
        time: v.visit_time,
        symptoms: v.symptoms
    }))
);

        setData(response.data);

        if (response.data.visits.length > 0) {
            setSelectedVisit(response.data.visits[0]);
        }

    } catch (error) {

        console.log(error);
        alert("Error loading patient profile");

    }

};

    if (!data) {
        return <h2>Loading Patient...</h2>;
    }

    return (

        <div className="patient-workspace">

            {/* =========================
                TOP SECTION
            ========================== */}

            <div className="workspace-top">

                {/* Patient Profile */}

                <div className="patient-profile-card">

                    <h2>👤 Patient Profile</h2>

                    <div className="patient-grid">

                        <div>
                            <strong>Name</strong>
                            <p>{data.patient.full_name}</p>
                        </div>

                        <div>
                            <strong>Patient ID</strong>
                            <p>{data.patient.patient_unique_id}</p>
                        </div>

                        <div>
                            <strong>Age</strong>
                            <p>{data.patient.age}</p>
                        </div>

                        <div>
                            <strong>Gender</strong>
                            <p>{data.patient.gender}</p>
                        </div>

                        <div>
                            <strong>Blood Group</strong>
                            <p>{data.patient.blood_group}</p>
                        </div>

                        <div>
                            <strong>Phone</strong>
                            <p>{data.patient.phone}</p>
                        </div>

                        <div>
                            <strong>Address</strong>
                            <p>{data.patient.address}</p>
                        </div>

                        <div>
                            <strong>Allergies</strong>
                            <p>{data.patient.allergies || "None"}</p>
                        </div>

                    </div>

                </div>

                {/* Visit Timeline */}

                <div className="timeline-card">

                    <h2>📅 Visit Timeline</h2>

                    {data.visits.length > 0 ? (

                        data.visits.map((visit) => (

                            <div
                                key={visit.visit_id}
                                className={
                                    selectedVisit?.visit_id === visit.visit_id
                                        ? "visit-card active"
                                        : "visit-card"
                                }
                                onClick={() => setSelectedVisit(visit)}
                            >

                                <div className="visit-header">

                                    <h3>Visit #{visit.visit_id}</h3>

                                    <span>
                                        {new Date(
                                            visit.visit_date
                                        ).toLocaleDateString()}
                                    </span>

                                </div>

                                <p>

                                    <strong>Symptoms:</strong>{" "}

                                    {visit.symptoms}

                                </p>

                            </div>

                        ))

                    ) : (

                        <p>No previous visits found.</p>

                    )}

                </div>

            </div>

            {/* =========================
                BOTTOM SECTION
            ========================== */}
{/* =========================
    BOTTOM SECTION
========================== */}

<div className="workspace-bottom">

    {selectedVisit ? (
        <>

            {/* =========================
                VISIT DETAILS
            ========================== */}

            <div className="visit-details-card">

                <h2 className="section-title">
                    🩺 Visit Details
                </h2>

                <p>
                    <strong>Symptoms:</strong> {selectedVisit.symptoms}
                </p>

            </div>

            <div className="details-grid">

                {/* SENSOR READINGS */}

                <div>

                    <h2 className="section-title">
                        🌡 Live Sensor Readings
                    </h2>

                    {selectedVisit.sensors &&
                    selectedVisit.sensors.length > 0 ? (

                        <div className="sensor-card">

                            <p>
                                <strong>❤️ Heart Rate:</strong>{" "}
                                {
                                    selectedVisit.sensors[
                                        selectedVisit.sensors.length - 1
                                    ].heart_rate
                                }{" "}
                                BPM
                            </p>

                            <p>
                                <strong>📈 ECG:</strong>{" "}
                                {
                                    selectedVisit.sensors[
                                        selectedVisit.sensors.length - 1
                                    ].ecg_value
                                }
                            </p>

                            <p>
                                <strong>🕒 Recorded At:</strong>{" "}
                                {new Date(
                                    selectedVisit.sensors[
                                        selectedVisit.sensors.length - 1
                                    ].recorded_at
                                ).toLocaleString()}
                            </p>

                        </div>

                    ) : (

                        <div className="sensor-card">

                            <p>No sensor data available.</p>

                        </div>

                    )}

                </div>

                {/* PRESCRIPTION */}

                <div>

                    <h2 className="section-title">
                        💊 Prescription
                    </h2>

                    <div className="prescription-card">

                        {selectedVisit.prescription ? (

                            <>

                                <p>
                                    <strong>Diagnosis:</strong>{" "}
                                    {selectedVisit.prescription.diagnosis}
                                </p>

                                <p>
                                    <strong>Medicines:</strong>{" "}
                                    {selectedVisit.prescription.medicines}
                                </p>

                                <p>
                                    <strong>Dosage:</strong>{" "}
                                    {selectedVisit.prescription.dosage}
                                </p>

                                <p>
                                    <strong>Laboratory Tests:</strong>{" "}
                                    {selectedVisit.prescription.laboratory_tests}
                                </p>

                                <p>
                                    <strong>Advice:</strong>{" "}
                                    {selectedVisit.prescription.advice}
                                </p>

                                <p>
                                    <strong>Follow-up:</strong>{" "}
                                    {selectedVisit.prescription.follow_up_date
                                        ? new Date(
                                              selectedVisit.prescription.follow_up_date
                                          ).toLocaleDateString("en-GB")
                                        : "Not Scheduled"}
                                </p>

                            </>

                        ) : (

                            <p>No prescription available.</p>

                        )}

                    </div>

                </div>

            </div>

        </>
    ) : (

        <div className="visit-details-card">

            <h2 className="section-title">
                🩺 New Patient
            </h2>

            <p>No previous visits found.</p>

        </div>

    )}

    {/* =========================
        ADD NEW CONSULTATION
    ========================== */}

    {doctor && (

        <div className="add-visit-card">

            <h2 className="section-title">
                ➕ New Consultation
            </h2>

            <AddVisit
                patientId={data.patient.patient_unique_id}
                doctorId={doctor.doctor_id}
                onVisitAdded={fetchPatient}
            />

        </div>

    )}

</div>
     

</div>



);

}

export default PatientWorkspace;