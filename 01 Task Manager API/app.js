const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { devLogger, accessLogger, errorLogger } = require("./utils/logger");

const authRoute = require("./routes/auth.route");
const taskRoute = require("./routes/task.route");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Loggers
app.use(devLogger); // to console
app.use(accessLogger); // all non-errors
app.use(errorLogger); // all errors

// Routes
app.use("/auth", authRoute);
app.use("/api/tasks", taskRoute);

module.exports = app;
