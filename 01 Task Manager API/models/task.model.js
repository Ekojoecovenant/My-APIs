const pool = require("../config/db");

const createTask = async (user_id, title, description) => {
  const query = `INSERT INTO taskmanager01.tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`;
  const values = [user_id, title, description];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getAllTaskByUser = async (user_id) => {
  const query = `SELECT * FROM taskmanager01.tasks WHERE user_id = $1 ORDER BY created_at`;
  const values = [user_id];
  const { rows } = await pool.query(query, values);
  return rows;
};

const getTaskById = async (id) => {
  const query = `SELECT * FROM taskmanager01.tasks WHERE id = $1 ORDER BY created_at`;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getAllTasks = async () => {
  const query = `SELECT * FROM taskmanager01.tasks ORDER BY created_at DESC`;
  const { rows } = await pool.query(query);
  return rows;
};

const deleteTask = async (id) => {
  const query = `DELETE FROM taskmanager01.tasks WHERE id = ? RETURNING *`;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createTask,
  getAllTaskByUser,
  getAllTasks,
  getTaskById,
  deleteTask,
};
