const express = require("express");
const router = express.Router();

const {
    getPatientDashboard,
    getDoctorDashboardStats,
    getStaffDashboardStats
} = require("../controllers/dashboardController");

// Test route
router.get("/test", (req, res) => {
    res.send("Dashboard Routes Working!");
});

// Get full patient dashboard
router.get("/patient/:id", getPatientDashboard);
// Doctor Dashboard Statistics
router.get("/doctor-stats/:doctorId", getDoctorDashboardStats);
router.get(
    "/staff-stats",
    getStaffDashboardStats
);

module.exports = router;