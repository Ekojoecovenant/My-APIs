// const { pool } = require("../config/db.js");
import { pool } from "../config/db.js";

export const createUserModel = async (name, email, hashedPassword) => {
  const query = `INSERT INTO TaskManager01.users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByEmailModel = async (email) => {
  const query = `SELECT * FROM TaskManager01.users WHERE email = $1`;
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const findUserByNameModel = async (name) => {
  const query = `SELECT * FROM TaskManager01.users WHERE name = $1`;
  const values = [name];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// module.exports = {
//   createUser,
//   findUserByEmail,
//   findUserByName,
// };
