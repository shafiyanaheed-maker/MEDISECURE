const db = require("../config/db");
// ==============================
// REGISTER STAFF
// ==============================

const registerStaff = (req, res) => {

    const {
        full_name,
        email,
        department,
        designation,
        hospital_id,
        password
    } = req.body;

    if (
        !full_name ||
        !email ||
        !department ||
        !designation ||
        !hospital_id ||
        !password
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });

    }

    const checkQuery = `
        SELECT *
        FROM hospital_staff
        WHERE email = ?
    `;

    db.query(checkQuery, [email], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Database Error",
                error: err
            });

        }

        if (result.length > 0) {

            return res.status(400).json({
                message: "Staff already exists"
            });

        }

        const staff_unique_id =
            "STF" + Math.floor(1000 + Math.random() * 9000);

        const insertQuery = `
            INSERT INTO hospital_staff
            (
                staff_unique_id,
                full_name,
                email,
                department,
                designation,
                hospital_id,
                password
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(

            insertQuery,

            [
                staff_unique_id,
                full_name,
                email,
                department,
                designation,
                hospital_id,
                password
            ],

            (err) => {

                if (err) {

                    return res.status(500).json({
                        message: "Database Error",
                        error: err
                    });

                }

                return res.status(201).json({

                    message: "Staff Registered Successfully",

                    staffId: staff_unique_id

                });

            }

        );

    });

};
// ==============================
// HOSPITAL STAFF LOGIN
// ==============================

const staffLogin = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            message: "Email and Password are required"
        });

    }

    const sql = `
    SELECT
s.*,
h.hospital_name
FROM hospital_staff s
JOIN hospitals h
ON s.hospital_id = h.hospital_id
WHERE s.email = ?
AND s.password = ?
    `;

    db.query(sql, [email, password], (err, result) => {

        if (err) {

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

        const staff = result[0];

        delete staff.password;

        return res.status(200).json({

            message: "Login Successful",

            staff

        });

    });

};module.exports = {

    registerStaff,

    staffLogin

};