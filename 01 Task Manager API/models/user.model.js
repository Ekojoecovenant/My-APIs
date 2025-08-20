const pool = require("../config/db");

const createUser = async (name, email, hashedPassword) => {
  const query = `INSERT INTO TaskManager01.users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, email, hashedPassword];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = `SELECT * FROM TaskManager01.users WHERE email = $1`;
  const values = [email];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const findUserByName = async (name) => {
  const query = `SELECT * FROM TaskManager01.users WHERE name = $1`;
  const values = [name];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByName,
};
