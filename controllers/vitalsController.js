const axios = require("axios");

const measureVitals = async (req, res) => {

    try {

        const pulse = await axios.post("http://localhost:5000/api/pulse/read");

        
           res.json({
    success: true,
    pulse: pulse.data.pulse,
    ecg: pulse.data.ecg
});

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    measureVitals
};