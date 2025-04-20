# Simple Jokes API

A fun and lightweight Node.js API that serves jokes from various categories.

## Table of Contents
- [Features](#features)
- [Endpoints](#endpoints)
- [Usage](#usage)

---

## Features

- Get all jokes
- Add, edit, delete jokes
- Fetch a random joke
- Fetch a random joke from a specific category
- Fetch multiple random jokes

## Endpoints

| Method | Endpoint                           | Description                             |
|--------|------------------------------------|-----------------------------------------|
| GET    | /jokes                             | Get all jokes                           |
| GET    | /jokes/category/:category          | Get all jokes from a category           |
| GET    | /jokes/random                      | Get one random joke                     |
| GET    | /jokes/random/category/:category   | Get a random joke from a category       |
| GET    | /jokes/search?q=id                 | Get joke by ID                          |
| POST   | /jokes/{body}                      | Add a new joke                          |
| PUT    | /jokes/:id                         | Edit a joke by ID                       |
| DELETE | /jokes/:id                         | Delete a joke by ID                     |

## Usage

### For Frontend
1. Use the API link [here](http:link) to access the API's data
2. For Endpoints usage examples, [Click here]()

### For Backend
1. Clone the repo
2. Run npm install
3. Start with node server.js or nodemon server.js
4. Visit [http://localhost:3000/api/jokes](http://localhost:3000/api/jokes)

---
