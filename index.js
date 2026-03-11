const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to my first API!");
});

// Get all users
app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];
  res.json(users);
});

// Get a single user by ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = { id, name: "Alice", email: "alice@example.com" };
  res.json(user);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
