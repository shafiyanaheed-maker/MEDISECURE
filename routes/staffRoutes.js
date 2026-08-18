const express = require("express");
const router = express.Router();

const {
    registerStaff,
    staffLogin
} = require("../controllers/staffController");

// Test Route
router.get("/test", (req, res) => {
    res.send("Hospital Staff Routes Working!");
});
router.post("/register", registerStaff);
// Login Route
router.post("/login", staffLogin);


module.exports = router;