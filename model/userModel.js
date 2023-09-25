const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel };
