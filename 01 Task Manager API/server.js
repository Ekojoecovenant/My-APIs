require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 3137;

const startServer = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
