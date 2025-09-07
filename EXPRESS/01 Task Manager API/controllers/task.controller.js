const Task = require("../models/task.model");

exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = await Task.createTask(req.user.id, title, description);

    if (!newTask)
      return res
        .status(400)
        .json({ msg: "An Error was encountered while creating a new Task" });

    res.status(201).json({ msg: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getTaskByUser = async (req, res) => {
  try {
    const tasks = await Task.getAllTaskByUser(req.user.id);

    if (!tasks) return res.status(404).json({ msg: "No task available" });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const id = +req.params.id;

    const task = await Task.getTaskById(id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks();

    if (!tasks) res.status(404).json({ msg: "No task available" });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = +req.params.id;

    const task = await Task.deleteTask(id);
    if (!task) res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task Deleted Sucessfully", task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteTaskByUser = async (req, res) => {
  try {
    const id = +req.params.id;

    const task = await functionFindUserTaskById(id, req.user.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const deletedTask = await Task.deleteTask(id);
    if (!deletedTask)
      return res.status(400).json({
        msg: `An error occurred while deleting the task with ID "${id}" `,
      });

    res.json({ msg: "Task Deleted Sucessfully", deletedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const id = +req.params.id;
    const { status } = req.body;
    console.log(`Id: ${id} || User ID: ${req.user.id}`);

    const task = await functionFindUserTaskById(id, req.user.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    const updatedTask = await Task.editTaskStatus(id, status);
    if (!updatedTask) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task Status Updated", updatedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = +req.params.id;
    const { title, description } = req.body;

    const task = await Task.editTask(id, title, description);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    res.json({ msg: "Task Updated Successfully", task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

async function functionGetTaskByUser(user_id) {
  const tasks = await Task.getAllTaskByUser(user_id);
  return tasks;
}

async function functionFindUserTaskById(id, user_id) {
  const task = await Task.getAllTaskByUserAndId(id, user_id);
  return task;
}
