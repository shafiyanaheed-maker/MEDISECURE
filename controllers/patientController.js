const db = require("../config/db");

// ==========================================
// REGISTER PATIENT
// ==========================================

const registerPatient = (req, res) => {

    const {

        full_name,
        age,
        gender,
        phone,
        address,
        blood_group,
        allergies,
        emergency_contact,
        password,
        fingerprint_id

    } = req.body;

    if (
        !full_name ||
        !age ||
        !gender ||
        !phone ||
        !password
    ) {

        return res.status(400).json({
            message: "Please fill all required fields."
        });

    }

    const patient_unique_id =
        "PAT" + Math.floor(1000 + Math.random() * 9000);

    const sql = `
    INSERT INTO patients
    (
        patient_unique_id,
        full_name,
        age,
        gender,
        phone,
        address,
        blood_group,
        allergies,
        emergency_contact,
        password,
        fingerprint_id
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [

            patient_unique_id,
            full_name,
            age,
            gender,
            phone,
            address,
            blood_group,
            allergies,
            emergency_contact,
            password,
            fingerprint_id

        ],

        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });

            }

            return res.status(201).json({

                message: "Patient Registered Successfully",

                patientId: patient_unique_id

            });

        }

    );

};

// ==========================================
// PATIENT LOGIN
// ==========================================

const patientLogin = (req, res) => {

    const {

        patient_unique_id,
        password

    } = req.body;

    const sql = `

    SELECT *

    FROM patients

    WHERE patient_unique_id = ?

    AND password = ?

    `;

    db.query(

        sql,

        [

            patient_unique_id,
            password

        ],

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    message: "Database Error"

                });

            }

            if (result.length === 0) {

                return res.status(401).json({

                    message:
                    "Invalid Patient ID or Password"

                });

            }

            const patient = result[0];

            delete patient.password;

            res.json({

                message: "Login Successful",

                patient

            });

        }

    );

};

// ==========================================
// SEARCH PATIENT
// ==========================================

const searchPatient = (req, res) => {

    const { query } = req.body;

    if (!query) {

        return res.status(400).json({
            message: "Search query is required"
        });

    }

    const sql = `
        SELECT *
        FROM patients
        WHERE full_name LIKE ?
        OR patient_unique_id LIKE ?
    `;

    const searchValue = `%${query}%`;

    db.query(sql, [searchValue, searchValue], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        return res.status(200).json({
            patients: result
        });

    });

};

const getFullPatient = (req, res) => {

    const patientId = req.params.id;

    const patientQuery = `
        SELECT *
        FROM patients
        WHERE patient_unique_id = ?
    `;

    db.query(patientQuery, [patientId], (err, patientResult) => {

        if (err) {
            console.log("Patient Query Error:", err);

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

        const patient = patientResult[0];

        delete patient.password;

        const visitQuery = `
            SELECT
                v.*,
                d.full_name AS doctor_name,
                d.specialization,
                h.hospital_name

            FROM visits v
LEFT JOIN doctors d
ON v.doctor_id = d.doctor_id

LEFT JOIN hospitals h
ON d.hospital_id = h.hospital_id
            WHERE v.patient_id = ?

            ORDER BY
                v.visit_date DESC,
                v.visit_time DESC
        `;

        db.query(visitQuery, [patient.patient_id], (err, visits) => {

            if (err) {
                console.log("Visit Query Error:", err);

                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });

            }

            const visitIds = visits.map(v => v.visit_id);

            if (visitIds.length === 0) {

                return res.status(200).json({

                    patient,
                    visits: []

                });

            }

            const prescriptionQuery = `
                SELECT *
                FROM prescriptions
                WHERE visit_id IN (?)
            `;

            const sensorQuery = `
                SELECT *
                FROM sensor_readings
                WHERE visit_id IN (?)
            `;

            db.query(prescriptionQuery, [visitIds], (err, prescriptions) => {

                if (err) {
                    console.log("Prescription Query Error:", err);

                    return res.status(500).json({
                        message: "Database Error",
                        error: err
                    });

                }

                db.query(sensorQuery, [visitIds], (err, sensors) => {

                    if (err) {
                        console.log("Sensor Query Error:", err);

                        return res.status(500).json({
                            message: "Database Error",
                            error: err
                        });

                    }

                    const fullVisits = visits.map((visit) => ({

                        ...visit,

                        prescription:
                            prescriptions.find(
                                p => p.visit_id === visit.visit_id
                            ) || null,

                        sensors:
                            sensors.filter(
                                s => s.visit_id === visit.visit_id
                            )

                    }));

                    return res.status(200).json({

                        patient,

                        visits: fullVisits

                    });

                });

            });

        });

    });

};

module.exports = {

    registerPatient,

    patientLogin,

    searchPatient,

    getFullPatient

};