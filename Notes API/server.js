const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 10001;

const dataFile = path.join(__dirname, "notes.json");
/* ``` Middlewares here...``` */

// JSON middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// To read the notes from the json file
let notes = [];

async function loadNotes() {
  try {
    const data = await fsp.readFile(dataFile, "utf8");
    notes = JSON.parse(data);
  } catch (err) {
    console.error("Failed to load quotes: ", err);
    notes = [];
  }
}

loadNotes(); // load notes on server start

/* ``` Routes here... ```*/

// to view all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// to get a particular note using the id
app.get("/notes/:id", (req, res) => {
  const id = +req.params.id;

  if (!id) {
    return res.status(400).json({ message: `Invalid input. Enter a valid ID` });
  }

  const filteredNote = notes.filter((note) => note.id == id);

  if (filteredNote < 1) {
    return res
      .status(404)
      .json({ message: `The Note with the id '${id}' does not exist` });
  }
  res.json(filteredNote);
});

// to create a new note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Title and Content fields are required." });
  }

  const newNote = {
    id: notes[notes.length - 1].id + 1,
    title,
    content,
    createdAt: new Date(),
  };

  notes.push(newNote);
  notes = notes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

  fs.writeFile(dataFile, JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to save note." });
    }
    res.status(201).json({ message: "Note added successfully!", newNote });
  });
});

// to edit the details of a note
app.put("/notes/:id", (req, res) => {
  const id = +req.params.id;

  if (!id) {
    return res.status(400).json({ message: `Invalid input. Enter a valid ID` });
  }

  const filteredNote = notes.filter((note) => note.id == id);

  if (filteredNote < 1) {
    return res
      .status(404)
      .json({ message: `The Note with the id '${id}' does not exist!` });
  }

  if (req.body.title) filteredNote[0].title = req.body.title;
  if (req.body.content) filteredNote[0].content = req.body.content;

  const otherNotes = notes.filter((note) => note.id != id);
  notes = [...otherNotes, ...filteredNote];
  notes = notes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

  fs.writeFile(dataFile, JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to edit note." });
    }
    res
      .status(201)
      .json({ message: "Note edited successfully!", filteredNote });
  });
});

// to delete a note
app.delete("/notes/:id", (req, res) => {
  const id = +req.params.id;

  if (!id) {
    return res.status(400).json({ message: `Invalid input. Enter a valid ID` });
  }

  const filteredNote = notes.filter((note) => note.id == id);

  if (filteredNote < 1) {
    return res
      .status(404)
      .json({ message: `The Note with the id '${id}' does not exist!` });
  }

  const otherNotes = notes.filter((note) => note.id != id);
  notes = [...otherNotes];
  notes = notes.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

  fs.writeFile(dataFile, JSON.stringify(notes, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete note." });
    }
    res
      .status(201)
      .json({ message: "Note deleted successfully!", filteredNote });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
