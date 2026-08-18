import React, { useState } from "react";
import axios from "axios";
import "../styles/AddVisit.css";

function AddVisit({
    patientId,
    doctorId,
    onVisitAdded
}) {
  const [formData, setFormData] = useState({
    
    symptoms: "",
    diagnosis: "",
    medicines: "",
    dosage: "",
    laboratory_tests: "",
    advice: "",
    follow_up_date: ""
  });
  const [vitals, setVitals] = useState({
    pulse: "--",
    ecg: "--"
});

const [loadingVitals, setLoadingVitals] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

// ✅ Paste measureVitals HERE

const measureVitals = async () => {

    try {

        setLoadingVitals(true);

        const response = await axios.post(
            "http://localhost:5000/api/vitals/read"
        );

        setVitals({
            pulse: response.data.pulse ?? "--",
            ecg: response.data.ecg ?? "--"
        });

    } catch (error) {

        console.log(error);

        alert("Unable to measure vitals.");

    } finally {

        setLoadingVitals(false);

    }

};

// saveVisit starts AFTER this



  const saveVisit = async () => {

    try {

    await axios.post(
    "http://localhost:5000/api/visits/add",
    {
        patient_unique_id: patientId,
        doctor_id: doctorId,
        ...formData,

        heart_rate: vitals.pulse === "--" ? null : Number(vitals.pulse),
        ecg_value: vitals.ecg === "--" ? null : Number(vitals.ecg)
    }
);
     alert("✅ Visit Added Successfully");
    

setFormData({
    symptoms: "",
    diagnosis: "",
    medicines: "",
    dosage: "",
    laboratory_tests: "",
    advice: "",
    follow_up_date: ""
});

if (onVisitAdded) {

    console.log("Refreshing patient...");

    await onVisitAdded();

    console.log("Refresh completed");

}
    } catch (error) {
      console.log(error.response?.data);

      console.log(error);

      alert("❌ Error adding visit");

    }

  };

  return (

    <div className="consultation-form">

      <div className="form-grid">

        <textarea
          className="form-input"
          name="symptoms"
          placeholder="Symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          rows="3"
        />

        <textarea
          className="form-input"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          rows="3"
        />

        <textarea
          className="form-input"
          name="medicines"
          placeholder="Medicines"
          value={formData.medicines}
          onChange={handleChange}
          rows="3"
        />

        <textarea
          className="form-input"
          name="dosage"
          placeholder="Dosage"
          value={formData.dosage}
          onChange={handleChange}
          rows="3"
        />

        <textarea
          className="form-input"
          name="laboratory_tests"
          placeholder="Laboratory Tests"
          value={formData.laboratory_tests}
          onChange={handleChange}
          rows="3"
        />

        <textarea
          className="form-input"
          name="advice"
          placeholder="Advice"
          value={formData.advice}
          onChange={handleChange}
          rows="3"
        />

      </div>
     <div className="vitals-card">

    <h3>🩺 Patient Vitals</h3>

    <p>
        ❤️ Pulse :
        <strong> {vitals.pulse} BPM</strong>
    </p>

    <p>
        📈 ECG :
        <strong> {vitals.ecg}</strong>
    </p>

    <button
        type="button"
        className="save-btn"
        onClick={measureVitals}
        disabled={loadingVitals}
    >
        {loadingVitals
            ? "Measuring..."
            : "🩺 Measure Vitals"}
    </button>

</div>

      <div className="followup-section">

        <label>Follow-up Date</label>

        <input
          className="date-input"
          type="date"
          name="follow_up_date"
          value={formData.follow_up_date}
          onChange={handleChange}
        />

      </div>

      <button
        className="save-btn"
        onClick={saveVisit}
      >
        Save Consultation
      </button>

    </div>

  );

}

export default AddVisit;