const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const EventSchema = new mongoose.Schema(
  {
    eventname: {
      type: String,
      required: true,
    },
    venu: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    organized: {
      type: String,
    },
    sdate: {
      type: String,
    },
    edate: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
EventSchema.plugin(autoIncrement.plugin, "Events");
module.exports = mongoose.model("Events", EventSchema);
