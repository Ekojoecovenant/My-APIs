const taskModel = require("../models/task.model");

exports.addTask = async (req, res) => {
  const { title, description } = req.body;

  const newTask = await taskModel.createTask(req.user.id, title, description);

  if (!newTask)
    return res
      .status(400)
      .json({ msg: "An Error was encountered while creating a new Task" });

  res.status(201).json({ msg: "Task created successfully", task: newTask });
};

exports.getTaskByUser = async (req, res) => {
  const tasks = await taskModel.getAllTaskByUser(req.user.id);

  if (!tasks) return res.status(404).json({ msg: "No task available" });

  res.json(tasks);
};

exports.getTaskById = async (req, res) => {
  const id = +req.params.id;

  const task = await taskModel.getTaskById(id);

  if (!task) return res.status(404).json({ msg: "Task not found" });

  res.json(task);
};

exports.getAllTask = async (req, res) => {
  const tasks = await taskModel.getAllTasks();

  if (!tasks) res.status(404).json({ msg: "No task available" });

  res.json(tasks);
};
