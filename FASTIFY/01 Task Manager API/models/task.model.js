// import { pool } from "../config/db.js";

export const createTask = async (pool, user_id, title, description) => {
  const query = `INSERT INTO taskmanager01.tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *`;
  const values = [user_id, title, description];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getAllTaskByUser = async (pool, user_id) => {
  const query = `SELECT * FROM taskmanager01.tasks WHERE user_id = $1 ORDER BY created_at`;
  const values = [user_id];
  const { rows } = await pool.query(query, values);
  return rows;
};

export const getAllTaskByUserAndId = async (pool, id, user_id) => {
  const query = `SELECT * FROM taskmanager01.tasks WHERE user_id = $2 AND id = $1 ORDER BY created_at`;
  const values = [id, user_id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getTaskByIdModel = async (pool, id) => {
  const query = `SELECT * FROM taskmanager01.tasks WHERE id = $1`;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getAllTasks = async (pool) => {
  const query = `SELECT * FROM taskmanager01.tasks ORDER BY created_at DESC`;
  const { rows } = await pool.query(query);
  return rows;
};

export const deleteTaskModel = async (pool, id) => {
  const query = `DELETE FROM taskmanager01.tasks WHERE id = $1 RETURNING *`;
  const values = [id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const editTaskStatus = async (pool, id, status) => {
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

export const editTask = async (pool, id, title, description) => {
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

// module.exports = {
//   createTask,
//   getAllTaskByUser,
//   getAllTaskByUserAndId,
//   getAllTasks,
//   getTaskByIdModel,
//   deleteTask,
//   editTaskStatus,
//   editTask,
// };
