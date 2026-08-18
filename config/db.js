const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mysql = require("mysql2");

console.log("DB USER:", process.env.DB_USER);
console.log("DB PASS:", process.env.DB_PASSWORD ? "LOADED" : "MISSING");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("❌ DB ERROR:");
    console.error(err.message);
    return;
  }

  console.log("✅ MySQL Connected Successfully");
});

module.exports = connection;