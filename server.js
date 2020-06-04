const express = require("express");
const db = require("./database.js");

const server = express();

// This is installing some middleware to allow Express
// to parse JSON request bodies. We'll go more into detail about this later.
server.use(express.json());

server.get("/api/users", (req, res) => {
  const users = db.getUsers();

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(500).json({
//       errorMessage: "The user with the specified ID does not exist.",
//     });
//   }
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      errorMessage: "The user with the specified ID does not exist.",
    });
  }
});

server.post("/api/users", (req, res) => {
  // never trust data coming from the client,
  // always validate it to some degree. make sure it's what you're expecting
  if (!req.body.name || !req.body.bio) {
    return res.status(400).json({
      message: "Please provide name and bio for the user.",
    });
  } 

  const newUser = db.createUser({
    name: req.body.name,
  });

  res.status(201).json(newUser);
});

server.put("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);
  if (user) {
    const updatedUser = db.updateUser(user.id, {
      name: req.body.name || user.name,
      bio: req.body.bio || user.bio,
    });
    res.json(updatedUser);
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const user = db.getUserById(req.params.id);

  if (user) {
    db.deleteUser(user.id);
    res.status(204).end();
  } else {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

server.listen(8000, () => {
  console.log("server started on port 8000");
});
