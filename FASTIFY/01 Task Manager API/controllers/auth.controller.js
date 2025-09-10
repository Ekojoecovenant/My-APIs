import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUserModel,
  findUserByEmailModel,
  findUserByNameModel,
} from "../models/user.model.js";

export async function registerUser(req, reply) {
  const { name, email, password } = req.body;

  // To check if a user exists
  const existingName = await findUserByNameModel(name);
  const existingEmail = await findUserByEmailModel(email);

  if (existingName)
    return reply.code(400).send({ msg: "Username already exists" });
  if (existingEmail)
    return reply.code(400).send({ msg: "Email already exists" });

  // To hash the user's password
  const hashed = await bcrypt.hash(password, 10);

  // To create a new User
  const user = await createUserModel(name, email, hashed);

  if (!user) {
    return reply
      .code(500)
      .send({ msg: "Error: User not registered successfully" });
  }

  reply.code(201).send({
    msg: "Registered successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium,
    },
  });
}

export async function loginUser(req, reply) {
  const { email, password } = req.body;

  // to check if user exists
  const user = await findUserByEmailModel(email);
  if (!user) return reply.code(400).send({ msg: "Invalid Credentials!" });

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return reply.code(400).send({ msg: "Invalid Credentials!" });

  // Create a Login Token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  reply.send({
    token: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isPremium: user.isPremium,
    },
  });
}

// export async function getProfile(req, reply) {
//   reply.send({ user: req.user });
// }
