const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  //   console.log(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
  // To check if a user exists
  const existingName = await userModel.findUserByName(name);
  const existingEmail = await userModel.findUserByEmail(email);

  if (existingName)
    return res.status(400).json({ msg: "Username already exists" });
  if (existingEmail)
    return res.status(400).json({ msg: "Email already exists" });

  // To hash the user's password
  const hashed = await bcrypt.hash(password, 10);
  //   console.log("Hashed Password:", password);

  // To create a new User
  const user = await userModel.createUser(name, email, hashed);

  if (!user) {
    return;
  }

  res
    .status(201)
    .json({ msg: "Registered successfully", user: { id: user.id, email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // to check if user exists
  const user = await userModel.findUserByEmail(email);
  if (!user) return res.status(400).json({ msg: "Invalid Credentials!" });

  // Check if password is correct
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ msg: "Invalid Credentials!" });

  // To Create a Login Token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isPremium: user.isPremium,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isPremium: user.isPremium,
    },
  });
};
