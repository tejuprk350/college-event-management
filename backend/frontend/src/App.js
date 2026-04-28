import React, { useEffect, useState } from "react";
import "./App.css";
import { FaTrash, FaEdit } from "react-icons/fa";

function App() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const addEvent = async () => {
    await fetch("http://localhost:5000/events/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, date, description }),
    });

    window.location.reload();
  };

  const deleteEvent = async (id) => {
    await fetch(`http://localhost:5000/events/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  const updateEvent = async (id) => {
    await fetch(`http://localhost:5000/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, date, description }),
    });

    setEditId(null);
    setTitle("");
    setDate("");
    setDescription("");

    window.location.reload();
  };

  return (
    <div className="container">
      <h1>College Event Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={editId ? () => updateEvent(editId) : addEvent}>
          {editId ? "Update Event" : "Add Event"}
        </button>
      </div>

      {events.map((event) => (
        <div className="event" key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <p>{event.description}</p>

          <button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => deleteEvent(event._id)}
          >
            <FaTrash /> Delete
          </button>

          <button
            style={{ backgroundColor: "green", color: "white" }}
            onClick={() => {
              setTitle(event.title);
              setDate(event.date);
              setDescription(event.description);
              setEditId(event._id);
            }}
          >
            <FaEdit /> Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;