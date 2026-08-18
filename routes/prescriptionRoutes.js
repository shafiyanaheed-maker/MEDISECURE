const express = require("express");
const router = express.Router();

const {
    createPrescription,
    getPrescription,
    updatePrescription
} = require("../controllers/prescriptionController");

// Create
router.post("/create", createPrescription);

// Get by visit
router.get("/:visitId", getPrescription);

// ✏️ Update prescription
router.put("/update/:id", updatePrescription);

module.exports = router;