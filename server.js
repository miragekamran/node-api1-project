const express = require("express");
const db = require("./database.js");

const server = express();

server.get("/api/users", (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

server.post("/api/users", (req, res) => {
  const newUser = db.createUser({
    name: "Mirage Kamran",
  });

  res.status(201).json(newUser);
});

server.listen(8000, () => {
  console.log("server started on port 8000");
});
