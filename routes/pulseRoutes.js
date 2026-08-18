const express = require("express");

const router = express.Router();

const { readPulse } = require("../controllers/pulseController");

router.post("/read", readPulse);

module.exports = router;