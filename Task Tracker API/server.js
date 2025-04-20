const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const port = 2323;

const dataFile = path.join(__dirname, "tasks.json");

// Body parser middleware
app.use(express.json());

// To read the tasks from the json file
let tasks = [];

function loadTasks() {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    tasks = JSON.parse(data);
  } catch (err) {
    console.error("Failed to load quotes: ", err);
    tasks = [];
  }
}

loadTasks(); // load tasks on server start

// Routers here...

// This returns all the tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// This returns a specific task based on id
app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;

  const filteredTask = tasks.filter((task) => task.id == id);

  if (filteredTask.length > 0) {
    res.json(filteredTask);
  } else {
    res.status(404).json({
      message: `The task with the id ${id} does not exist.`,
    });
  }
});

// Adding a new task
app.post("/tasks", (req, res) => {
  const { id, title, description, completed } = req.body;

  if (
    !id ||
    !title ||
    !description ||
    completed == null ||
    completed == undefined
  ) {
    res.status(400).json({
      message: "id, title, description and completed fields are required.",
    });
  } else {
    const newTask = { id, title, description, completed };
    tasks.push(newTask);
    tasks = tasks.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    fs.writeFile(dataFile, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to save task." });
      }
      res.status(201).json({ message: "Tasks added successfully!", newTask });
    });
  }
});

// To Update a Task
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const filteredTask = tasks.filter((task) => task.id == id);

  if (filteredTask.length < 1) {
    res
      .status(404)
      .json({ message: `The task with the id ${id} does not exist.` });
  } else {
    if (req.body.title) filteredTask[0].title = req.body.title;
    if (req.body.description)
      filteredTask[0].description = req.body.description;
    if (req.body.completed) filteredTask[0].completed = req.body.completed;

    const notSearched = tasks.filter((task) => task.id != id);
    const unsortedTasks = [...notSearched, ...filteredTask];
    tasks = unsortedTasks.sort((a, b) =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    );
    res.json(filteredTask);
  }
});

// This deletes a task
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const filteredTask = tasks.filter((task) => task.id == id);

  if (filteredTask.length < 1) {
    res
      .status(404)
      .json({ message: `The task with the id ${id} does not exist.` });
  } else {
    const notSearched = tasks.filter((task) => task.id != id);
    tasks = notSearched.sort((a, b) =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    );
    res.json(tasks);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
