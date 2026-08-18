import React, { useState } from "react";
import axios from "axios";
import "../styles/PatientRegistration.css";

function PatientRegistration({ darkMode }) {

  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    blood_group: "",
    allergies: "",
    emergency_contact: "",
    password: ""
  });

  const [registeredPatient, setRegisteredPatient] = useState(null);
  const [fingerprintId, setFingerprintId] = useState(null);
const [fingerprintEnrolled, setFingerprintEnrolled] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };
  const enrollFingerprint = async () => {

  try {

    // Temporary fingerprint ID
    // Later we'll generate this automatically
    const idResponse = await axios.get(
    "http://localhost:5000/api/fingerprint/next-id"
);

const nextFingerprintId =
    idResponse.data.fingerprintId;

    const response = await axios.post(

      "http://localhost:5000/api/fingerprint/enroll",

      {
        fingerprintId: nextFingerprintId
      }

    );

    if (response.data.success) {

      setFingerprintId(nextFingerprintId);
      setFingerprintEnrolled(true);

      alert(
        "Fingerprint enrollment started.\nPlease place your finger on the sensor twice."
      );

    }

  }

  catch (err) {

    console.log(err);

    if (err.response) {

        alert(err.response.data.message);

    } else {

        alert("Unable to communicate with Arduino.");

    }

}

};

  const registerPatient = async () => {
    if (!fingerprintEnrolled) {

  alert("Please enroll the fingerprint first.");

  return;

}

    try {

      const response = await axios.post(
        "http://localhost:5000/api/patients/register",
        {
          ...formData,
          fingerprint_id: fingerprintId
        }
      );

      setRegisteredPatient({
        id: response.data.patientId,
        password: formData.password
      });

      setFormData({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        blood_group: "",
        allergies: "",
        emergency_contact: "",
        password: ""
      });

    }

    catch (error) {

      console.log(error);

      if (error.response) {

        alert(error.response.data.message);

      }

      else {

        alert("Server Error");

      }

    }

  };

  return (

<div
className={`registration-page ${
darkMode ? "dark-dashboard" : "light-dashboard"
}`}
>

<h2 className="registration-title">
🏥 Patient Registration
</h2>

<div className="registration-grid">

<input
className="registration-input"
type="text"
name="full_name"
placeholder="Full Name"
value={formData.full_name}
onChange={handleChange}
/>

<input
className="registration-input"
type="number"
name="age"
placeholder="Age"
value={formData.age}
onChange={handleChange}
/>

<select
className="registration-input"
name="gender"
value={formData.gender}
onChange={handleChange}
>

<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>

</select>

<input
className="registration-input"
type="text"
name="phone"
placeholder="Phone Number"
value={formData.phone}
onChange={handleChange}
/>

<input
className="registration-input"
type="text"
name="blood_group"
placeholder="Blood Group"
value={formData.blood_group}
onChange={handleChange}
/>

<input
className="registration-input"
type="text"
name="emergency_contact"
placeholder="Emergency Contact"
value={formData.emergency_contact}
onChange={handleChange}
/>

<input
className="registration-input"
type="password"
name="password"
placeholder="Create Password"
value={formData.password}
onChange={handleChange}
/>

<textarea
className="registration-textarea"
name="address"
placeholder="Address"
value={formData.address}
onChange={handleChange}
/>

<textarea
className="registration-textarea"
name="allergies"
placeholder="Allergies"
value={formData.allergies}
onChange={handleChange}
/>

</div>
{fingerprintEnrolled && (

<div
style={{
    color: "green",
    fontWeight: "bold",
    marginBottom: "15px"
}}
>

✅ Fingerprint Enrolled
<br />
Fingerprint ID : {fingerprintId}

</div>

)}
<button
className="registration-btn"
onClick={enrollFingerprint}
>
🆔 Enroll Fingerprint
</button>

<button
className="registration-btn"
onClick={registerPatient}
>
Register Patient
</button>

{registeredPatient && (

<div className="success-card">

<h2>
✅ Patient Registered Successfully
</h2>

<h3>
Generated Patient ID
</h3>

<h1>
{registeredPatient.id}
</h1>

<h3 style={{ marginTop: "20px" }}>
Password
</h3>

<h2>
{registeredPatient.password}
</h2>

<p style={{ marginTop: "15px" }}>
Please provide these credentials to the patient.
</p>

</div>

)}

</div>

  );

}

export default PatientRegistration;