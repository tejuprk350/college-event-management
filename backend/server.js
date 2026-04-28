const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');
console.log("Event Routes Loaded");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRoutes);

// MongoDB connection will come here
mongoose.connect("mongodb://127.0.0.1:27017/eventDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});