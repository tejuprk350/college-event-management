const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Add Event API
router.post("/add", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.send("Event Added Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get All Events API
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Event API
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.send("Event Deleted Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Event API
router.put("/:id", async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.send("Event Updated Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// ✅ MUST be at bottom
module.exports = router;