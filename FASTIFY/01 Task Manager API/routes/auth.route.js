import { registerUser, loginUser } from "../controllers/auth.controller.js";

// -- SCHEMAS -- //

const user = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    email: { type: "string" },
    role: { type: "string" },
    isPremium: { type: "boolean" },
  },
};

const error = {
  type: "object",
  properties: {
    msg: { type: "string" },
  },
};

// -- SCHEMA OPTIONS -- //
// Register User Options
const registerUserOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          msg: { type: "string" },
          user: user,
        },
      },
      400: error,
      500: error,
    },
  },
  handler: registerUser,
};

const loginUserOpts = {
  schema: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: user,
        },
      },
      400: error,
    },
  },
  handler: loginUser,
};

// Auth Routes
async function authRoutes(fastify, options) {
  // Register a new user
  fastify.post("/register", registerUserOpts);

  // Login a user
  fastify.post("/login", loginUserOpts);
}

export default authRoutes;

// const express = require("express");
// const router = express.Router();

// const authController = require("../controllers/auth.controller");

// router.post("/register", authController.register);
// router.post("/login", authController.login);

// module.exports = router;
