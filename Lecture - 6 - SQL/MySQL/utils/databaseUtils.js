const mysql = require("mysql2");

const connection = mysql
    .createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "airnb"
    })
    .promise();

connection
    .query("SELECT 1")
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Connection failed:", err.message));

module.exports = connection;
