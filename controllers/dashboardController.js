const db = require("../config/db");

/**
 * Get full patient profile for dashboard
 * Includes:
 * - patient details
 * - visits
 * - sensor readings
 * - prescriptions
 */
const getPatientDashboard = (req, res) => {
   const patientUniqueId = req.params.id;

    const sql = `
        SELECT 
            p.patient_id,
            p.patient_unique_id,
            p.full_name,
            p.age,
            p.gender,
            p.phone,
            p.blood_group,
            
            v.visit_id,
            v.visit_date,
            v.visit_time,
            v.symptoms,

            s.body_temperature,
            s.heart_rate,
            s.blood_pressure,
            s.recorded_at,

            pr.diagnosis,
            pr.medicines,
            pr.dosage,
            pr.advice

        FROM patients p
        LEFT JOIN visits v ON p.patient_id = v.patient_id
        LEFT JOIN sensor_readings s ON v.visit_id = s.visit_id
        LEFT JOIN prescriptions pr ON v.visit_id = pr.visit_id

        WHERE p.patient_unique_id = ?
        ORDER BY v.visit_id DESC
    `;

    db.query(sql, [patientUniqueId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        return res.status(200).json({
            message: "Patient Dashboard Data",
            data: result
        });
    });
};

// ==========================================
// DOCTOR DASHBOARD STATISTICS
// ==========================================
const getDoctorDashboardStats = async (req, res) => {

    const doctorId = req.params.doctorId;

    try {

        const [todayPatients] = await db.promise().query(
            `
            SELECT COUNT(DISTINCT patient_id) AS count
            FROM visits
            WHERE doctor_id = ?
            AND visit_date = CURDATE()
            `,
            [doctorId]
        );

        const [totalVisits] = await db.promise().query(
            `
            SELECT COUNT(*) AS count
            FROM visits
            WHERE doctor_id = ?
            `,
            [doctorId]
        );

        const [pendingFollowUps] = await db.promise().query(
            `
            SELECT COUNT(*) AS count
            FROM prescriptions p
            JOIN visits v
            ON p.visit_id = v.visit_id
            WHERE v.doctor_id = ?
            AND p.follow_up_date >= CURDATE()
            `,
            [doctorId]
        );

        const [emergencyAlerts] = await db.promise().query(
            `
            SELECT COUNT(*) AS count
            FROM sensor_readings s
            JOIN visits v
            ON s.visit_id = v.visit_id
            WHERE v.doctor_id = ?
            AND (
                s.body_temperature > 38.5
                OR s.heart_rate > 120
            )
            `,
            [doctorId]
        );

        res.json({

            todayPatients: todayPatients[0].count,

            totalVisits: totalVisits[0].count,

            pendingFollowUps: pendingFollowUps[0].count,

            emergencyAlerts: emergencyAlerts[0].count

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Dashboard Error"

        });

    }

};

// ==========================================
// STAFF DASHBOARD STATISTICS
// ==========================================

const getStaffDashboardStats = async (req, res) => {

    try {

        const [todayRegistrations] = await db.promise().query(`
            SELECT COUNT(*) AS count
            FROM patients
            WHERE DATE(created_at)=CURDATE()
        `);

        const [totalPatients] = await db.promise().query(`
            SELECT COUNT(*) AS count
            FROM patients
        `);

        const [totalDoctors] = await db.promise().query(`
            SELECT COUNT(*) AS count
            FROM doctors
        `);

        const [pendingEnrollments] = await db.promise().query(`
            SELECT COUNT(*) AS count
            FROM patients
            WHERE fingerprint_id IS NULL
               OR face_id IS NULL
        `);

        res.json({
            todayRegistrations: todayRegistrations[0].count,
            totalPatients: totalPatients[0].count,
            totalDoctors: totalDoctors[0].count,
            pendingEnrollments: pendingEnrollments[0].count
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Dashboard Error"
        });

    }

};

module.exports = {

    getPatientDashboard,

    getDoctorDashboardStats,

    getStaffDashboardStats

};