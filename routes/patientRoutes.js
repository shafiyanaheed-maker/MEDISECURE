const express = require("express");
const router = express.Router();

const {
    registerPatient,
    patientLogin,
    searchPatient,
    getFullPatient
} = require("../controllers/patientController");


// ===============================
// REGISTER PATIENT
// ===============================
router.post("/register", registerPatient);


// ===============================
// PATIENT LOGIN
// ===============================
router.post("/login", patientLogin);


// ===============================
// SEARCH PATIENT
// ===============================
router.post("/search", searchPatient);


// ===============================
// GET FULL PATIENT PROFILE
// ===============================
router.get("/full/:id", getFullPatient);


module.exports = router;