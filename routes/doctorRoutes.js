const express = require("express");
const router = express.Router();

const {
    registerDoctor,
    doctorLogin
} = require("../controllers/doctorController");

router.get("/test", (req, res) => {
    res.send("Doctor Routes Working!");
});

// Register Doctor
router.post("/register", registerDoctor);

// Doctor Login
router.post("/login", doctorLogin);

module.exports = router;