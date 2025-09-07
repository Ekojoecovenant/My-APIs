const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const taskController = require("../controllers/task.controller");

// Add a new task for the current user
router.post("/", verifyToken, taskController.addTask);

// Get all Tasks of the current user
router.get("/me", verifyToken, taskController.getTaskByUser);

// Get all tasks of all users
router.get("/", verifyToken, taskController.getAllTask);

// Get a task by the task's id
router.get("/:id", verifyToken, taskController.getTaskById);

// Edit the status of a task for the current user
router.put("/:id/status", verifyToken, taskController.updateTaskStatus);

// Edit the details of a task for the current user
router.put("/:id", verifyToken, taskController.updateTask);

module.exports = router;
