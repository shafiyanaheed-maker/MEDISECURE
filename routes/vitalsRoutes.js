const express = require("express");

const router = express.Router();

const { measureVitals } = require("../controllers/vitalsController");

router.post("/read", measureVitals);

module.exports = router;