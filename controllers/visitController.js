const db = require("../config/db");

// ==========================================
// ADD NEW VISIT + PRESCRIPTION
// ==========================================

const addVisit = (req, res) => {

    const {

        patient_unique_id,
        doctor_id,
        symptoms,
        diagnosis,
        medicines,
        dosage,
        laboratory_tests,
        advice,
        follow_up_date,
        heart_rate,
    body_temperature,
    ecg_value 


    } = req.body;

    // Find patient ID

    const patientQuery = `
        SELECT patient_id
        FROM patients
        WHERE patient_unique_id = ?
    `;

    db.query(patientQuery, [patient_unique_id], (err, patientResult) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error",
                error: err
            });

        }

        if (patientResult.length === 0) {

            return res.status(404).json({
                message: "Patient not found"
            });

        }

        const patient_id = patientResult[0].patient_id;

        // Insert Visit

        const visitQuery = `
            INSERT INTO visits
            (
                patient_id,
                doctor_id,
                visit_date,
                visit_time,
                symptoms
            )
            VALUES
            (
                ?,
                ?,
                CURDATE(),
                CURTIME(),
                ?
            )
        `;

        db.query(

            visitQuery,

            [
                patient_id,
                doctor_id,
                symptoms
            ],

            (err, visitResult) => {

                if (err) {

                    return res.status(500).json({
                        message: "Error creating visit",
                        error: err
                    });

                }

                const visit_id = visitResult.insertId;

                // Insert Prescription

                const prescriptionQuery = `
                    INSERT INTO prescriptions
                    (
                        visit_id,
                        diagnosis,
                        medicines,
                        dosage,
                        laboratory_tests,
                        advice,
                        follow_up_date
                    )
                    VALUES
                    (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )
                `;

               db.query(

    prescriptionQuery,

    [

        visit_id,
        diagnosis,
        medicines,
        dosage,
        laboratory_tests,
        advice,
        follow_up_date

    ],

    (err) => {

        if (err) {

    console.error("Prescription Error:", err);

    return res.status(500).json({

        message: "Error saving prescription",

        error: err

    });

}
const sensorQuery = `
    INSERT INTO sensor_readings
    (
        visit_id,
        body_temperature,
        heart_rate,
        ecg_value
    )
    VALUES
    (
        ?, ?, ?, ?
    )
`;
        

        db.query(

            sensorQuery,

            [

                visit_id,
                null,
                heart_rate || null,
                ecg_value || null

            ],

            (sensorErr) => {

                if (sensorErr) {

    console.error("Sensor Error:", sensorErr);

    return res.status(500).json({

        message: "Error saving sensor readings",

        error: sensorErr

    });

}

                return res.status(201).json({

                    message: "Visit Added Successfully",

                    visit_id

                });

            }

        );

    }

);

            }

        );

    });

};

module.exports = {

    addVisit

};