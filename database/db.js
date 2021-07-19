require("dotenv").config();
const mongoose = require("mongoose");

const Connection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database connected successfully..");
  } catch (error) {
    console.log("Error while connecting to MongoDB,", error);
  }
};
module.exports = Connection;
