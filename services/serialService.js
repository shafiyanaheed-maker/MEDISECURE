const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

const port = new SerialPort({
    path: "COM9",
    baudRate: 115200,
    autoOpen: true
});

const parser = port.pipe(
    new ReadlineParser({
        delimiter: "\n"
    })
);

port.on("open", () => {
    console.log("✅ Arduino Connected");
});

port.on("error", (err) => {
    console.log("Serial Error:", err.message);
});
console.log("Port exists:", !!port);
console.log("Parser exists:", !!parser);

module.exports = {
    port,
    parser
};