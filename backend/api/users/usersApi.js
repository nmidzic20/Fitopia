exports.getUsers = function (req, res, db) {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.json(rows);
    }
  });
};

exports.getUser = function (req, res, db) {
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
};

exports.createUser = function (req, res, db) {
  console.log("Creating user");
  const user = req.body;
  db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    user.username,
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
};

exports.updateUser = function (req, res, db) {
  const id = req.params.id;
  const user = req.body;
  db.run(
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
    user.username,
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
};

exports.deleteUser = function (req, res, db) {
  const id = req.params.id;
  db.run("DELETE FROM users WHERE id = ?", id, (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ message: "User deleted" });
    }
  });
};
