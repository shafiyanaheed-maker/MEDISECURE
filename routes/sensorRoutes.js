const express = require("express");
const router = express.Router();

const { addSensorReading } = require("../controllers/sensorController");

// Test route
router.get("/test", (req, res) => {
    res.send("Sensor Routes Working!");
});

// Add sensor data
router.post("/add", addSensorReading);

module.exports = router;