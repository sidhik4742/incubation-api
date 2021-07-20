const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const SubscribersSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    managerName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);
SubscribersSchema.plugin(autoIncrement.plugin, "Subscribers");
module.exports = mongoose.model("Subscribers", SubscribersSchema);
