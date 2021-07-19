//  import dotenv package at the top
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const paymentRoutes = require("./routes/payment");

// mongoose db connection
const Connection = require("./database/db.js");
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("DB CONNECTED...");
//   });

/// middleware usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// *********************************
////// Routers
//************************ */
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", eventRoutes);
app.use("/api/payment", paymentRoutes);
// listning to the port number
app.listen(port, (req, res) => {
  console.log(`sever is running and it is listening to the port ${port}`);
});

// db connection call
Connection();
