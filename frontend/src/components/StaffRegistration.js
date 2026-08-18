import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/DoctorRegistration.css";

function StaffRegistration({ darkMode }) {

    const [staff, setStaff] = useState({
        full_name: "",
        email: "",
        department: "",
        designation: "",
        hospital_id: "",
        password: ""
    });

    const [staffId, setStaffId] = useState("");

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

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setStaff({

            ...staff,

            [e.target.name]: e.target.value

        });

    };

    const registerStaff = async () => {

        try {

            const response = await axios.post(

                "http://localhost:5000/api/staff/register",

                staff

            );

            setStaffId(response.data.staffId);

            setStaff({

                full_name: "",
                email: "",
                department: "",
                designation: "",
                hospital_id: "",
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

<div className="doctor-registration">

<h2 className="doctor-title">

👩‍💼 Register Hospital Staff

</h2>

<div className="doctor-grid">

<input
className="doctor-input"
name="full_name"
placeholder="Full Name"
value={staff.full_name}
onChange={handleChange}
/>

<input
className="doctor-input"
type="email"
name="email"
placeholder="Email"
value={staff.email}
onChange={handleChange}
/>

<input
className="doctor-input"
name="department"
placeholder="Department"
value={staff.department}
onChange={handleChange}
/>

<input
className="doctor-input"
name="designation"
placeholder="Designation"
value={staff.designation}
onChange={handleChange}
/>

<select
className="doctor-input"
name="hospital_id"
value={staff.hospital_id}
onChange={handleChange}
>

<option value="">

Select Hospital

</option>

{

hospitals.map((hospital)=>(

<option

key={hospital.hospital_id}

value={hospital.hospital_id}

>

{hospital.hospital_name}

</option>

))

}

</select>

<input
className="doctor-input"
type="password"
name="password"
placeholder="Password"
value={staff.password}
onChange={handleChange}
/>

</div>

<button

className="doctor-btn"

onClick={registerStaff}

>

Register Staff

</button>

{

staffId && (

<div className="doctor-success">

<h2>

✅ Staff Registered Successfully

</h2>

<h3>

Generated Staff ID

</h3>

<h1>

{staffId}

</h1>

</div>

)

}

</div>

    );

}

export default StaffRegistration;