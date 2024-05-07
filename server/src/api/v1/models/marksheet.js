const mongoose = require("mongoose");

const marksheet = new mongoose.Schema({
  test: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Test",
    required: true,
    unique: true
  },
  academicYear: {
    type: String,
    required: true,
  },
  fullMarksOfTest: {
    type: Number,
    required: true,
  },
  sheet: {
    type: Map,
    of: Number,
    default: {},
  },
});

const Marksheet = mongoose.model("Marksheet", marksheet);

module.exports = {
  Marksheet,
};
