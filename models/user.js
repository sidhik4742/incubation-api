const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { timeStamp } = require("console");
const autoIncrement = require("mongoose-auto-increment");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    encryp_password: {
      type: String,
      //   required: true
    },
    salt: String,
    role: {
      type: Number,
      required: true,
      default: 0,
    },
    phone: {
      type: Number,
      min: 10,
      // required:true
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  timeStamp
);

userSchema
  .virtual("password")
  // setter  and getter methods
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encryp_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// securing password method
userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encryp_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "user");
module.exports = mongoose.model("user", userSchema);
