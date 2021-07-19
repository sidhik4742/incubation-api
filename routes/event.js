const express = require("express");
// var mongoose = require("mongoose");
// var Grid = require("gridfs-stream");
const {
  CreateEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/event.js");

const { uploadImage, getImage } = require("../controller/imageController.js");
const upload = require("../utils/upload.js");

const router = express.Router();


// ROUTES FOR THE EVENT MANAGEMENT
router.post("/createEvent", CreateEvent);
router.get("/getall", getAllEvents);
router.get("/getById/:id", getEvent);
router.post("/update/:id", updateEvent);
router.delete("/delete/:id", deleteEvent);


// upload is middleware to upload single file
router.post("/file", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);


module.exports = router;
