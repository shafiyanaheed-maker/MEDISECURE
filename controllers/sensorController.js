const db = require("../config/db");

// Add sensor reading for a visit
const addSensorReading = (req, res) => {
    const {
        visit_id,
        body_temperature,
        heart_rate,
        blood_pressure
    } = req.body;

    if (!visit_id) {
        return res.status(400).json({
            message: "visit_id is required"
        });
    }

    const sql = `
        INSERT INTO sensor_readings 
        (visit_id, body_temperature, heart_rate, blood_pressure)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [visit_id, body_temperature, heart_rate, blood_pressure],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err
                });
            }

            return res.status(201).json({
                message: "Sensor Data Stored Successfully",
                reading_id: result.insertId
            });
        }
    );
};

module.exports = {
    addSensorReading
};