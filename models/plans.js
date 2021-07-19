const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const PlansSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
PlansSchema.plugin(autoIncrement.plugin, "Plans");
module.exports = mongoose.model("Plans", PlansSchema);
