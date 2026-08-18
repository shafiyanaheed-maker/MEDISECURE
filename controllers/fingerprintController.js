const db = require("../config/db");
const { port, parser } = require("../services/serialService");
console.log("Controller parser exists:", !!parser);

// ==========================================
// ENROLL FINGERPRINT
// ==========================================

const enrollFingerprint = (req, res) => {

    const { fingerprintId } = req.body;

    if (!fingerprintId) {
        return res.status(400).json({
            success: false,
            message: "Fingerprint ID required"
        });
    }

    console.log("Sending ENROLL command:", fingerprintId);

    // Remove any old listeners
    //parser.removeAllListeners("data");

    // Send command to Arduino
    port.write(`ENROLL:${fingerprintId}\n`);

    // Wait for Arduino response
    const onData = (data) => {

    data = data.trim();

    console.log("Arduino:", data);

    if (data.startsWith("SUCCESS:")) {

        parser.removeListener("data", onData);

        return res.json({
            success: true,
            fingerprintId
        });

    }

    if (data.startsWith("FAILED:")) {

        parser.removeListener("data", onData);

        return res.status(400).json({
            success: false,
            message: "Fingerprint enrollment failed"
        });

    }

    // Ignore all other messages:
    // "Waiting for finger..."
    // "Image taken"
    // "Remove finger"
};

parser.on("data", onData);

};
const fingerprintLogin = (req, res) => {

    console.log("Searching fingerprint...");

    //parser.removeAllListeners("data");

    port.write("SEARCH\n");

    const onData = (data) => {

        data = data.trim();

        console.log("Arduino:", data);

        if (data.startsWith("MATCH:")) {

            parser.removeListener("data", onData);

            const fingerprintId = parseInt(data.split(":")[1]);

            const sql = `
                SELECT *
                FROM patients
                WHERE fingerprint_id = ?
            `;

            db.query(sql, [fingerprintId], (err, result) => {

                if (err) {

                    return res.status(500).json({
                        success: false,
                        message: "Database Error"
                    });

                }

                if (result.length === 0) {

                    return res.status(404).json({
                        success: false,
                        message: "Patient not found"
                    });

                }

                return res.json({
                    success: true,
                    patient: result[0]
                });

            });

        }

        if (data === "NOT_FOUND") {

            parser.removeListener("data", onData);

            return res.status(404).json({
                success: false,
                message: "Fingerprint not enrolled"
            });

        }

    };

    parser.on("data", onData);

};

// ==========================================
// GET NEXT FINGERPRINT ID
// ==========================================

const getNextFingerprintId = (req, res) => {

    const sql = `
        SELECT MAX(fingerprint_id) AS lastId
        FROM patients
        WHERE fingerprint_id BETWEEN 1 AND 999
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        const lastId = result[0].lastId || 0;

        const nextId = lastId + 1;

        return res.json({
            fingerprintId: nextId
        });

    });

};

module.exports = {
    enrollFingerprint,
    getNextFingerprintId,
    fingerprintLogin
};