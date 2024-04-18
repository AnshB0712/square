const mongoose = require("mongoose");

const standard = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    default: "1",
  },
  field: {
    type: String,
    enum: ["SCIENCE", "COMMERCE", "NONE"],
    default: "NONE",
  },
});
