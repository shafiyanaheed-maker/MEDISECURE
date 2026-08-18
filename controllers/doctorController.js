const db = require("../config/db");

// ==============================
// REGISTER DOCTOR
// ==============================

const registerDoctor = (req, res) => {
    console.log(req.body);

    const {
        full_name,
        email,
        specialization,
        hospital_id,
        password
    } = req.body;

    if (
        !full_name ||
        !email ||
        !specialization ||
        !hospital_id ||
        !password
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const checkQuery = `
        SELECT *
        FROM doctors
        WHERE email = ?
    `;

    db.query(checkQuery, [email], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Database Error",
                error: err
            });

        }

        if (result.length > 0) {

            return res.status(400).json({
                message: "Doctor already exists"
            });

        }

        const insertQuery = `
            INSERT INTO doctors
            (
                full_name,
                email,
                specialization,
                hospital_id,
                password
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            insertQuery,
            [
                full_name,
                email,
                specialization,
                hospital_id,
                password
            ],
            (err, insertResult) => {

                if (err) {

                    return res.status(500).json({
                        message: "Database Error",
                        error: err
                    });

                }

                return res.status(201).json({

                    message: "Doctor Registered Successfully",

                    doctorId: insertResult.insertId

                });

            }

        );

    });

};

// ==============================
// DOCTOR LOGIN
// ==============================

const doctorLogin = (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        console.log("Database Error:", err);

        return res.status(400).json({
            message: "Email and Password are required"
        });

    }

    const sql = `
       SELECT
    d.*,
    h.hospital_name
FROM doctors d
LEFT JOIN hospitals h
ON d.hospital_id = h.hospital_id
WHERE d.email = ?
AND d.password = ?
    `;

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log("Database Error:", err);

            return res.status(500).json({
                message: "Database Error",
                error: err
            });

        }

        if (result.length === 0) {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

        const doctor = result[0];

        delete doctor.password;

        return res.status(200).json({

            message: "Login Successful",

            doctor

        });

    });

};

module.exports = {

    registerDoctor,
    doctorLogin

};