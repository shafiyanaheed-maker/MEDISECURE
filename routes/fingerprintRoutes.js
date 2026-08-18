console.log("Fingerprint routes loaded");
const express = require("express");

const router = express.Router();

const {
    enrollFingerprint,
    getNextFingerprintId,
    fingerprintLogin
} = require("../controllers/fingerprintController");

router.post("/enroll", enrollFingerprint);
router.get("/next-id", getNextFingerprintId);
router.post("/login", fingerprintLogin);

module.exports = router;