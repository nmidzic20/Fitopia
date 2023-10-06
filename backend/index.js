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
    password TEXT
  )
`);

// Get all users
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get user by id

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM users WHERE id = ?", id, (err, row) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (row === undefined) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(row);
    }
  });
});

// Create user

app.post("/users", (req, res) => {
  const user = req.body;
  db.run(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    user.first_name,
    user.last_name,
    user.email,
    user.password,
    (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(201).json({ message: "User created" });
      }
    }
  );
});

// Update user

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;
  db.run(
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?",
    user.first_name,
    user.last_name,
    user.email,
    user.password,
    id,
    (err) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({ message: "User updated" });
      }
    }
  );
});

// Delete user

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", id, (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  });
});

// Start server on port 3000 and listen for requests
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
