const express = require("express");
const router = express.Router();

const {
    addVisit
} = require("../controllers/visitController");

router.post("/add", addVisit);

module.exports = router;