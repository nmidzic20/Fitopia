const express = require("express");
const fs = require("fs/promises");
const sqlite3 = require("sqlite3");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create db
const db = new sqlite3.Database("app_db.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT,
  )
`);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
