const { port, parser } = require("../services/serialService");

const readPulse = (req, res) => {

    if (!port || !parser) {

        return res.status(500).json({
            success: false,
            message: "Arduino not connected"
        });

    }

    parser.removeAllListeners("data");

    let pulse = null;
    let ecg = null;

    port.write("PULSE\n");

    parser.on("data", (data) => {

        data = data.trim();

        console.log("Arduino:", data);

        if (data.startsWith("PULSE:")) {

            pulse = parseInt(data.split(":")[1]);

        }

        else if (data.startsWith("ECG:")) {

            ecg = parseInt(data.split(":")[1]);

        }

        else if (data === "READY") {

            return res.json({

                success: true,
                pulse,
                ecg

            });

        }

    });

};

module.exports = {
    readPulse
};