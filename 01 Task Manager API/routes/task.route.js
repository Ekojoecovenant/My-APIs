const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const taskController = require("../controllers/task.controller");

router.post("/", verifyToken, taskController.addTask);

router.get("/me", verifyToken, taskController.getTaskByUser);

router.get("/", verifyToken, taskController.getAllTask);

router.get("/:id", verifyToken, taskController.getTaskByUser);

module.exports = router;
