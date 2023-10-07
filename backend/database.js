const sqlite3 = require("sqlite3");

// Create and export the database instance
const db = new sqlite3.Database("app_db.db");

module.exports = db;
