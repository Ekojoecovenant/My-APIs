# Simple Jokes API

A fun and lightweight Node.js API that serves jokes from various categories.

## Table of Contents
- [Base Url](#base-url)
- [Features](#features)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Usage Examples](#usage-examples)
  - [JavaScript](#javascript)

---

## Base Url
Simple Jokes Api Url: [https://simple-jokes-api-001.onrender.com](https://simple-jokes-api-001.onrender.com)

---

## Features

- Get all jokes
- Add, edit, delete jokes
- Fetch a random joke
- Fetch a random joke from a specific category
- Fetch multiple random jokes

---

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

---

## Usage

1. Use the API link to access the API's data
2. For Endpoints usage examples, [Click here](#usage-example)

---

## Usage Examples

### JavaScript
The following are examples for each route...

#### 1) To get all Jokes
```
const apiBase = 'https://simple-quotes-api-test.onrender.com';

async function fetchData() {
    const res = await fetch(`${apiBase}/jokes`);
    const data = await res.json();
    return data;
}

```

#### 2) To get all the jokes in a particular category
```
const apiBase = 'https://simple-quotes-api-test.onrender.com';
const category = 'Dad jokes';

async function fetchData() {
    const res = await fetch(`${apiBase}/jokes/category/${category}`);
    const data = await res.json();
    return data;
}
```

#### 3) To get a random joke from any category
```
const apiBase = 'https://simple-quotes-api-test.onrender.com';

async function fetchData() {
    const res = await fetch(`${apiBase}/jokes/random`);
    const data = await res.json();
    return data;
}
```

#### 4) To get a random joke from a particular category
```
const apiBase = 'https://simple-quotes-api-test.onrender.com';
const category = 'Dad jokes';

async function fetchData() {
    const res = await fetch(`${apiBase}/jokes/random/category/${category}`);
    const data = await res.json();
    return data;
}
```

#### 5) To search for a joke by ID
```
const apiBase = 'https://simple-quotes-api-test.onrender.com';
const id = 201;

async function fetchData() {
    const res = await fetch(`${apiBase}/jokes/search?q=${id}`);
    const data = await res.json();
    return data;
}
```

#### 6) To add a joke 
NOTE: This is temporary as the API refreshes every 2 minutes of inactivity.
```
const apiBase = 'https://simple-quotes-api-test.onrender.com';
const category = "My joke";
const setup = "What the most dangerous bug on earth?";
const punchline = "Error on line 123.....POV: The line is blank";

const res = await fetch(`${apiBase}/jokes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, setup, punchline })
});

if (res.status === 201) {
    alert('Quote added!');
    // Add your code here
} else {
    const err = await res.json();
    alert('Error: ' + err.message);
}
```

#### 7) To search and edit a joke by ID
NOTE: This is temporary as the API refreshes every 2 minutes of inactivity.
```
// Still in testing phase. Solution coming soon!
```

#### 8) To delete a joke using the ID
NOTE: This is temporary as the API refreshes every 2 minutes of inactivity.
```
// Still in testing phase. Solution coming soon!
```

---
