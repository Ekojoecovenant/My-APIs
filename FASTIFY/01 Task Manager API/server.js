import buildApp from "./app.js";
import { pool } from "./config/db.js";
import { config } from "dotenv";
config();
// const app = require("./app");

const PORT = process.env.PORT || 3137;

const fastify = buildApp();

// Start server
const start = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");
    await fastify.listen({ port: PORT });
    fastify.log.info(`Server running...`);
  } catch (err) {
    fastify.log.error("Error:", err.message);
    process.exit(1);
  }
};

start();

// const startServer = async () => {
//   try {
//     await pool.connect();
//     console.log("Connected to PostgreSQL");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("DB connection failed:", err.message);
//     process.exit(1);
//   }
// };

// startServer();
