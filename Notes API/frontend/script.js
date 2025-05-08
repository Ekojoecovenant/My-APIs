const LIVE_URL = "https://simple-notes-api-001.onrender.com/notes";

const notesContainer = document.getElementById("notesContainer");

async function loadNotes() {
  try {
    const res = await fetch(LIVE_URL); // Replace with your live URL
    const data = await res.json();

    data.forEach((note) => {
      const noteEl = document.createElement("div");
      noteEl.className = "note";
      noteEl.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${note.id})">Delete</button>`;
      notesContainer.appendChild(noteEl);
    });
  } catch (err) {
    console.error("Failed to load notes:", err);
  }
}

loadNotes();

// TO ADD A NEW NOTE FROM THE DB
const noteForm = document.getElementById("noteForm");

noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) return alert("Please fill out both fields.");

  try {
    const res = await fetch(LIVE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      // Refresh notes list
      notesContainer.innerHTML = "";
      await loadNotes();
      noteForm.reset();
    } else {
      throw new Error("Failed to add note.");
    }
  } catch (err) {
    console.error(err);
    alert("Could not add note.");
  }
});

// TO DELETE A NOTE FROM THE DB
async function deleteNote(id) {
  try {
    const res = await fetch(`${LIVE_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      notesContainer.innerHTML = "";
      await loadNotes();
    } else {
      throw new Error("Failed to delete note.");
    }
  } catch (err) {
    console.error(err);
    alert("Could not delete note.");
  }
}

// REGISTER
document.getElementById("registerBtn").addEventListener("click", async () => {
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const response = await fetch(LIVE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  alert(data.message);
});

// LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch(LIVE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html"; // or whatever your main app page is
  } else {
    alert(data.message);
  }
});
