const mongoose = require("mongoose");
require("dotenv").config();

const empSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, enum: ["Tech", "Marketing", "Operations"] },
    salary: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const empModel = mongoose.model("Employee", empSchema);

module.exports = { empModel };
