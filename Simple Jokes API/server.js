const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const port = 4043;

const dataFile = path.join(__dirname, "jokes.json");

// Body parser middleware
app.use(express.json());

// To read the jokes from the json file
let jokes = [];

async function loadJokes() {
  try {
    const data = await fsp.readFile(dataFile, "utf8");
    jokes = JSON.parse(data);
  } catch (err) {
    console.error("Failed to load quotes: ", err);
    jokes = [];
  }
}

loadJokes(); // load jokes on server start

// Routers here...

// This gets all the jokes
app.get("/jokes", (req, res) => {
  res.json(jokes);
});

// This gets all the jokes in a particular category
app.get("/jokes/category/:category", (req, res) => {
  const category = req.params.category;

  const filteredJokes = jokes.filter(
    (joke) =>
      joke.category.toLowerCase() == category.split("-").join(" ").toLowerCase()
  );

  if (filteredJokes.length > 0) {
    res.json(filteredJokes);
  } else {
    res.status(404).json({
      message: `The Jokes category '${category}' does not exist! Contact support!`,
    });
  }
});

// This gets a random joke from any category
app.get("/jokes/random", (req, res) => {
  const random = Math.floor(Math.random() * jokes.length);

  res.json(jokes[random]);
});

// This gets a random joke from a particular category
app.get("/jokes/random/category/:category", (req, res) => {
  const category = req.params.category;

  const filteredJokes = jokes.filter(
    (joke) =>
      joke.category.toLowerCase() == category.split("-").join(" ").toLowerCase()
  );

  if (filteredJokes.length > 0) {
    res.json(filteredJokes[Math.floor(Math.random() * filteredJokes.length)]);
  } else {
    res.status(404).json({
      message: `The Jokes category '${category}' does not exist! Contact support!`,
    });
  }
});

// This searches for the joke by id
app.get("/jokes/search", (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ message: "Search query 'id' is required." });
  }

  const result = jokes.filter((joke) => joke.id == id);

  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: `No Joke with id ${id} exists` });
  }
});

// This adds a new joke
app.post("/jokes", (req, res) => {
  const { category, setup, punchline } = req.body;

  if (!category || !setup || !punchline) {
    res.status(400).json({
      message: "Category, Setup and Punchline fields are required",
    });
  } else {
    const newJoke = {
      id: jokes[jokes.length - 1].id + 1,
      category,
      setup,
      punchline,
    };
    jokes.push(newJoke);
    jokes = jokes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    fs.writeFile(dataFile, JSON.stringify(jokes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to save joke." });
      }
      res.status(201).json({ message: "Joke added successfully!", newJoke });
    });
  }
});

// This updates a joke
app.put("/jokes/:id", (req, res) => {
  const id = req.params.id;
  const filteredJoke = jokes.filter((joke) => joke.id == id);

  if (filteredJoke.length < 1) {
    return res
      .status(404)
      .json({ message: `The Joke with the ID '${id}' does not exist` });
  }

  if (req.body.category) filteredJoke[0].category = req.body.category;
  if (req.body.setup) filteredJoke[0].setup = req.body.setup;
  if (req.body.punchline) filteredJoke[0].punchline = req.body.punchline;

  const otherJokes = jokes.filter((joke) => joke.id != id);
  jokes = [...otherJokes, ...filteredJoke];
  jokes = jokes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.json(filteredJoke);
});

// This removes/deletes a joke
app.delete("/jokes/:id", (req, res) => {
  const id = req.params.id;
  const filteredJoke = jokes.filter((joke) => joke.id == id);

  if (filteredJoke < 1) {
    return res
      .status(404)
      .json({ message: `The joke with the id '${id} does not exist` });
  }

  jokes = jokes.filter((joke) => joke.id != id);
  jokes = jokes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res
    .status(200)
    .json({
      message: `The Joke with the id '${id} has been deleted successfully`,
    });
});

// Hosts the app on a port temporarily
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
