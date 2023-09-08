const express = require("express");
const bodyParse = require("body-parser");
const bcrypt = require("bcrypt-nodejs");

const app = express();

app.use(bodyParse.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@sadmin.com",
      password: "password",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "saddle",
      email: "joasd@min.com",
      password: "password1",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("Signin success");
  } else {
    res.status(404).json("Signin error");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  database.users.push({
    id: "126",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(3000, (err, res) => {
  console.log("app listening");
});
