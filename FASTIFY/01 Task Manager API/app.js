import Fastify from "fastify";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";
import db from "./config/db.js";

const buildApp = () => {
  const fastify = Fastify({ logger: true });

  // Register plugins
  fastify.register(fastifyHelmet); // helmet for security
  fastify.register(fastifyCors); // cors for authorization
  fastify.register(db); // db for data persistence

  // Routes
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(taskRoutes, { prefix: "/api/tasks" }); // task routes

  return fastify;
};

export default buildApp;

// const { devLogger, accessLogger, errorLogger } = require("./utils/logger");

// const authRoute = require("./routes/auth.route");
// const taskRoute = require("./routes/task.route");

// // Loggers
// app.use(devLogger); // to console
// app.use(accessLogger); // all non-errors
// app.use(errorLogger); // all errors

// // Routes
// app.use("/auth", authRoute);
// app.use("/api/tasks", taskRoute);
