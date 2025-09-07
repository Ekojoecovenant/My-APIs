const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

// Create logs folder if it doesn't exist
const logDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create write stream
const accessLogStream = fs.createWriteStream(path.join(logDir, "access.log"), {
  flags: "a",
});
const errorLogStream = fs.createWriteStream(path.join(logDir, "error.log"), {
  flags: "a",
});

// Only log non-errors
const accessLogger = morgan("combined", {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400,
});

// Only log errors
const errorLogger = morgan("combined", {
  stream: errorLogStream,
  skip: (req, res) => res.statusCode < 400,
});

// Log to console in dev format
const devLogger = morgan("dev");

module.exports = {
  accessLogger,
  errorLogger,
  devLogger,
};
