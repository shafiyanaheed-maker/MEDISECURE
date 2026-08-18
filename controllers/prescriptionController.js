const db = require("../config/db");

// Create prescription (already exists in your project likely)
const createPrescription = (req, res) => {
    const {
        visit_id,
        diagnosis,
        medicines,
        dosage,
        laboratory_tests,
        advice,
        follow_up_date
    } = req.body;

    const sql = `
        INSERT INTO prescriptions 
        (visit_id, diagnosis, medicines, dosage, laboratory_tests, advice, follow_up_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [visit_id, diagnosis, medicines, dosage, laboratory_tests, advice, follow_up_date],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            res.json({
                message: "Prescription Created",
                prescription_id: result.insertId
            });
        }
    );
};

// Get prescription by visit
const getPrescription = (req, res) => {
    const { visitId } = req.params;

    const sql = `
        SELECT * FROM prescriptions WHERE visit_id = ?
    `;

    db.query(sql, [visitId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        res.json({
            message: "Prescription Data",
            data: result
        });
    });
};

// ✏️ UPDATE PRESCRIPTION (MAIN FEATURE)
const updatePrescription = (req, res) => {
    const { id } = req.params;

    const {
        diagnosis,
        medicines,
        dosage,
        laboratory_tests,
        advice,
        follow_up_date
    } = req.body;

    const sql = `
        UPDATE prescriptions
        SET 
            diagnosis = ?,
            medicines = ?,
            dosage = ?,
            laboratory_tests = ?,
            advice = ?,
            follow_up_date = ?
        WHERE prescription_id = ?
    `;

    db.query(
        sql,
        [
            diagnosis,
            medicines,
            dosage,
            laboratory_tests,
            advice,
            follow_up_date,
            id
        ],
        (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            res.json({
                message: "Prescription Updated Successfully"
            });
        }
    );
};

module.exports = {
    createPrescription,
    getPrescription,
    updatePrescription
};