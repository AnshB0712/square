const mongoose = require("mongoose");

const standard = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    enum: ["SCIENCE", "COMMERCE", "NONE"],
    default: "NONE",
  },
});

const Standard = mongoose.model("Standard", standard);

module.exports = { Standard };
