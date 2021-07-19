const Events = require("../models/event");
// import { Events } from "../models/event";

// create event
exports.CreateEvent = async (req, res) => {
  try {
    const event1 = await new Events(req.body);
    // console.log(event1);
    event1.save();
    res.status(200).json("Event created successflly..");
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

// get all events
exports.getAllEvents = async (req, res) => {
  try {
    let event1 = await Events.find({}).sort("-createdAt");

    res.status(200).json(event1);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// get event by and id

exports.getEvent = async (req, res) => {
  try {
    // sort("-createdAt");
    const event1 = await Events.findById(req.params.id).sort("-createdAt");

    res.status(200).json(event1);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// update event by and id

exports.updateEvent = async (req, res) => {
  try {
    await Events.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json("Event updated successfully");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete event

exports.deleteEvent = async (req, res) => {
  try {
    const event1 = await Events.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).json({
        message: error,
      });
    }
    res.send(event1);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};
