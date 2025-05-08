const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFile = path.join(__dirname, "users.json");

// Helper to read users
function readUsers() {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
}

// Helper to write users
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// POST /register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const users = readUsers();

  const existsUsername = users.find((user) => user.username === username);
  const existsEmail = users.find((user) => user.email === email);

  if (existsUsername)
    return res.status(409).json({ message: "Username already exists" });

  if (existsEmail)
    return res.status(409).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  writeUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});

// POST /login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((user) => user.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  // Simple token generation
  const token = Date.now().toString(); // we'll improve this later
  res.status(200).json({ message: "Login successful", token });
});

module.exports = router;
