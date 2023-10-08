const usersApi = require("./api/users/usersApi");

const express = require("express");
const fs = require("fs/promises");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const fetch = require("node-fetch");

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

app.get("/api/users", (req, res) => usersApi.getUsers(req, res, db));
app.get("/api/users/:id", (req, res) => usersApi.getUser(req, res, db));
app.post("/api/users", (req, res) => usersApi.createUser(req, res, db));
app.put("/api/users/:id", (req, res) => usersApi.updateUser(req, res, db));
app.delete("/api/users/:id", (req, res) => usersApi.deleteUser(req, res, db));

app.get("/api/fitness-data", (req, res) => {
  console.log("NOdejs fitness");
  let url = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";
  let data = {
    aggregateBy: [
      {
        dataTypeName: "com.google.step_count.delta",
        dataSourceId:
          "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
      },
    ],
    bucketByTime: { durationMillis: 86400000 },
    startTimeMillis: 1695080200000,
    endTimeMillis: 1696698463764,
  };

  let accessToken =
    "ya29.a0AfB_byD1UdCYkOBH2QP08aXpCJ7qvyUtEnHJJryPtMHo0gTCmP-vpvpKk8KexpFVqX9uHRY5m8JQKq-H-kNy3Ho_i20p4UbOLCtJBoj4Z98mk96YQhC16QjHh8vv9YpLTwHrePoSzkwZ8gi0ue1v3u-v870xWdeutihWaCgYKATUSARISFQGOcNnC0-p6Dv3DTM8mFG2N27beoA0171";

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log("POST Request Successful:", data);
      res.status(200).json({ message: data });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ message: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
