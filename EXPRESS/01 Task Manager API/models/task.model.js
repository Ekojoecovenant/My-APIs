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

const getAllTaskByUserAndId = async (id, user_id) => {
  const query = `SELECT * FROM taskmanager01.tasks WHERE user_id = $2 AND id = $1 ORDER BY created_at`;
  const values = [id, user_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const getTaskById = async (id) => {
  const query = `SELECT * FROM taskmanager01.tasks WHERE id = $1`;
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
  const query = `DELETE FROM taskmanager01.tasks WHERE id = $1 RETURNING *`;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const editTaskStatus = async (id, status) => {
  const query = `
    UPDATE taskmanager01.tasks 
    SET status = $2, updated_at = NOW() 
    WHERE id = $1 
    RETURNING *
  `;
  const values = [id, status];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const editTask = async (id, title, description) => {
  const query = `
    UPDATE taskmanager01.tasks 
    SET title = $2, description = $3, updated_at = NOW() 
    WHERE id = $1
    RETURNING *
  `;
  const values = [id, title, description];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

module.exports = {
  createTask,
  getAllTaskByUser,
  getAllTaskByUserAndId,
  getAllTasks,
  getTaskById,
  deleteTask,
  editTaskStatus,
  editTask,
};
