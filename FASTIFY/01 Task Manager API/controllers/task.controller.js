import { pool } from "../config/db.js";
import {
  createTask,
  getAllTaskByUser,
  getAllTaskByUserAndId,
  getAllTasks,
  getTaskByIdModel,
  deleteTaskModel,
  editTaskStatus,
  editTask,
} from "../models/task.model.js";

export const addTask = async (req, reply) => {
  try {
    const { title, description } = req.body;

    const newTask = await createTask(pool, req.user.id, title, description);

    if (!newTask)
      return reply
        .code(400)
        .send({ msg: "An Error was encountered while creating a new Task" });

    reply.code(201).send({ msg: "Task created successfully", task: newTask });
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

// Get all tasks by a particular user
export const getTaskByUser = async (req, reply) => {
  try {
    const tasks = await getAllTaskByUser(pool, req.user.id);

    if (!tasks) return reply.code(404).send({ msg: "No task available" });

    reply.send(tasks);
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

// Get a particular task by the id
export const getTaskById = async (req, reply) => {
  try {
    const id = +req.params.id;

    const task = await getTaskByIdModel(pool, id);

    if (!task) return reply.code(404).send({ msg: "Task not found" });

    reply.send(task);
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

// Get all task in the DB
export const getAllTask = async (req, reply) => {
  try {
    const tasks = await getAllTasks(pool);

    if (!tasks) reply.code(404).send({ msg: "No task available" });

    reply.send(tasks);
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

export const deleteTask = async (req, reply) => {
  try {
    const id = +req.params.id;

    const task = await deleteTaskModel(pool, id);
    if (!task) reply.code(404).send({ msg: "Task not found" });

    reply.send({ msg: "Task Deleted Sucessfully", task: task });
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

export const deleteTaskByUser = async (req, reply) => {
  try {
    const id = +req.params.id;

    const task = await functionFindUserTaskById(pool, id, req.user.id);
    if (!task) return reply.code(404).send({ msg: "Task not found" });

    const deletedTask = await deleteTaskModel(pool, id);
    if (!deletedTask)
      return reply.code(400).send({
        msg: `An error occurred while deleting the task with ID "${id}" `,
      });

    reply.send({ msg: "Task Deleted Sucessfully", task: deletedTask });
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

export const updateTaskStatus = async (req, reply) => {
  try {
    const id = +req.params.id;
    const { status } = req.body;
    console.log(`Id: ${id} || User ID: ${req.user.id}`);

    const task = await functionFindUserTaskById(pool, id, req.user.id);

    if (!task) return reply.code(404).send({ msg: "Task not found" });

    const updatedTask = await editTaskStatus(pool, id, status);
    if (!updatedTask) return reply.code(404).send({ msg: "Task not found" });

    reply.send({ msg: "Task Status Updated", task: updatedTask });
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

export const updateTask = async (req, reply) => {
  try {
    const id = +req.params.id;
    const { title, description } = req.body;

    const task = await editTask(pool, id, title, description);
    if (!task) return reply.code(404).send({ msg: "Task not found" });

    reply.send({ msg: "Task Updated Successfully", task });
  } catch (error) {
    reply.code(500).send({ msg: error.message });
  }
};

async function functionGetTaskByUser(pool, user_id) {
  const tasks = await getAllTaskByUser(pool, user_id);
  return tasks;
}

async function functionFindUserTaskById(pool, id, user_id) {
  const task = await getAllTaskByUserAndId(pool, id, user_id);
  return task;
}
