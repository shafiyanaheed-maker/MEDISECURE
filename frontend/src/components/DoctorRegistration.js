import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DoctorRegistration.css";
function DoctorRegistration({ darkMode }) {

  const [doctor, setDoctor] = useState({

    full_name:"",
    email:"",
    specialization:"",
    hospital_id:"",
    password:""

});
  const [doctorId,setDoctorId]=useState("");
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    loadHospitals();
}, []);

const loadHospitals = async () => {

    try {

        const response = await axios.get(
            "http://localhost:5000/api/hospitals"
        );

        setHospitals(response.data);

    } catch (err) {

        console.log(err);

    }

};

  const handleChange = (e) => {

    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value
    });

  };

  const registerDoctor = async () => {

    try {

      const response = await axios.post(
    "http://localhost:5000/api/doctors/register",
    doctor
);

setDoctorId(response.data.doctorId);

      setDoctor({
        full_name: "",
        email: "",
        specialization: "",
        hospital_id: "",
        password: ""
      });

    } catch (error) {

      console.log(error);

      if (error.response) {

        alert(error.response.data.message);

      } else {

        alert("Server Error");

      }

    }

  };

  return (

<div className="doctor-registration">

    <h2 className="doctor-title">

        👨‍⚕ Register New Doctor

    </h2>

    <div className="doctor-grid">

        <input
            className="doctor-input"
            name="full_name"
            placeholder="Doctor Name"
            value={doctor.full_name}
            onChange={handleChange}
        />

        <input
            className="doctor-input"
            type="email"
            name="email"
            placeholder="Doctor Email"
            value={doctor.email}
            onChange={handleChange}
        />

        <input
    className="doctor-input"
    name="specialization"
    placeholder="Specialization"
    value={doctor.specialization}
    onChange={handleChange}
/>

<select
    className="doctor-input"
    name="hospital_id"
    value={doctor.hospital_id}
    onChange={handleChange}
>

    <option value="">
        Select Hospital
    </option>

    {hospitals.map((hospital)=>(
        <option
            key={hospital.hospital_id}
            value={hospital.hospital_id}
        >
            {hospital.hospital_name}
        </option>
    ))}

</select>

        <input
            className="doctor-input"
            type="password"
            name="password"
            placeholder="Password"
            value={doctor.password}
            onChange={handleChange}
        />

    </div>

    <button
        className="doctor-btn"
        onClick={registerDoctor}
    >
        Register Doctor
    </button>

    {doctorId && (

        <div className="doctor-success">

            <h2>

                ✅ Doctor Registered Successfully

            </h2>

            <h3>Generated Doctor ID</h3>

            <h1>{doctorId}</h1>

        </div>

    )}

</div>

);

}

export default DoctorRegistration;