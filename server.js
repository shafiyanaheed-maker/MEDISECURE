console.log("Running server.js from:", __filename);
const express = require("express");
const cors = require("cors");


const app = express();

require("dotenv").config();

// Database Connection
const db = require("./config/db");
require("./services/serialService");

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    next();
});

// Import Routes
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const visitRoutes = require("./routes/visitRoutes");
const staffRoutes = require("./routes/staffRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const fingerprintRoutes = require("./routes/fingerprintRoutes");
const pulseRoutes = require("./routes/pulseRoutes");
const vitalsRoutes = require("./routes/vitalsRoutes");

// API Routes
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/fingerprint", fingerprintRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/pulse", pulseRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("🏥 Smart Hospital Backend Running");
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});