const usersApi = require("./api/users/usersApi");

const express = require("express");
const fs = require("fs/promises");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const db = require("./database");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    email TEXT,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY,
    idUser INTEGER,
    title TEXT,
    FOREIGN KEY (idUser) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS waypoints (
    id INTEGER PRIMARY KEY,
    xCoord INTEGER,
    yCoord INTEGER,
    region TEXT
  );

  CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY,
    idStory INTEGER,
    idWaypoint INTEGER,
    text TEXT,
    pictureUrl TEXT,
    FOREIGN KEY (idStory) REFERENCES stories(id),
    FOREIGN KEY (idWaypoint) REFERENCES waypoints(id)
  );

  CREATE TABLE IF NOT EXISTS fitnessData (
    id INTEGER PRIMARY KEY,
    idUser INTEGER,
    weight REAL,
    FOREIGN KEY (idUser) REFERENCES users(id)
  );
`);

app.get("/api/users", (res, req) => usersApi.getUsers(res, req, db));
app.get("/api/users/:id", (res, req) => usersApi.getUser(res, req, db));
app.post("/api/users", (res, req) => usersApi.createUser(res, req, db));
app.put("/api/users/:id", (res, req) => usersApi.updateUser(res, req, db));
app.delete("/api/users/:id", (res, req) => usersApi.deleteUser(res, req, db));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
