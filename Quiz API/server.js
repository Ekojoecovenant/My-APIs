const fsp = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 2022;

const dataFile = path.join(__dirname, "questions.json");
/* ``` Middlewares here...``` */

// JSON middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// To read the notes from the json file
let questions = [];

async function loadQuiz() {
  try {
    const data = await fsp.readFile(dataFile, "utf8");
    questions = JSON.parse(data);
  } catch (err) {
    console.error("Failed to load quotes: ", err);
    questions = [];
  }
}

loadQuiz(); // load quiz on server start

/* ``` External Routes here... ``` */
app.get("/quiz", (req, res) => {
  res.json(questions);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
