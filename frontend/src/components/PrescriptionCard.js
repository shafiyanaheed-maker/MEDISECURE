import React, { useState } from "react";
import axios from "axios";

function PrescriptionCard({ prescription }) {
  const [data, setData] = useState(prescription);
  const [edit, setEdit] = useState(false);

  const update = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const save = async () => {
    await axios.put(
      `http://localhost:5000/api/prescriptions/${data.prescription_id}`,
      data
    );

    alert("Saved Successfully");
    setEdit(false);
  };

  return (
    <div style={{
      marginTop: "15px",
      padding: "15px",
      border: "2px solid #1976d2",
      borderRadius: "10px"
    }}>
      <h3>💊 Prescription Panel</h3>

      <input name="diagnosis" value={data.diagnosis} onChange={update} />
      <input name="medicines" value={data.medicines} onChange={update} />
      <input name="dosage" value={data.dosage} onChange={update} />

      <br />

      {!edit ? (
        <button onClick={() => setEdit(true)}>✏️ Edit</button>
      ) : (
        <button onClick={save}>💾 Save</button>
      )}
    </div>
  );
}

export default PrescriptionCard;