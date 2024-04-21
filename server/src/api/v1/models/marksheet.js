const mongoose = require("mongoose");

const marksheet = new mongoose.Schema({
  test: {
    type: mongoose.SchemaTypes.ObjectId,
    reference: "test",
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

const Marksheet = mongoose.model("marksheet", marksheet);

module.exports = {
  Marksheet,
};
