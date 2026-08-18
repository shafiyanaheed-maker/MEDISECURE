import React from "react";
import PrescriptionCard from "./PrescriptionCard";

function PatientTimeline({ data }) {
  if (!data || !data.timeline) return <p>No data found</p>;

  return (
    <div>
      <h2>📅 Medical Timeline</h2>

      {data.timeline.map((visit, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          {/* VISIT INFO */}
          <h3>🧾 Visit ID: {visit.visit_id}</h3>
          <p><b>Date:</b> {new Date(visit.visit_date).toDateString()}</p>
          <p><b>Time:</b> {visit.visit_time}</p>
          <p><b>Symptoms:</b> {visit.symptoms}</p>

          {/* PRESCRIPTION */}
          {visit.prescription ? (
            <PrescriptionCard
              prescription={visit.prescription}
            />
          ) : (
            <p>⚠️ No prescription found</p>
          )}

          {/* SENSOR DATA */}
          {visit.sensors && visit.sensors.length > 0 && (
            <div>
              <h4>📡 Sensor Readings</h4>

              {visit.sensors.map((s, i) => (
                <div key={i} style={{ marginLeft: "10px" }}>
                  <p>
                    🌡 Temp: {s.temperature}°C | ❤️ HR: {s.heart_rate} | 🩸 BP: {s.blood_pressure}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PatientTimeline;