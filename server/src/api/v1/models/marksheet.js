const mongoose = require("mongoose");

const marksheet = new mongoose.Schema({
  test: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Test",
    required: true,
    unique: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  fullMarksOfTest: {
    type: Number,
    required: true,
  },
  sheet: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      data: {
        mark: {
          type: String,
          required: true,
        },
        reqmark: {
          type: String,
          required: true,
        },
      },
    },
  ],
});

const Marksheet = mongoose.model("Marksheet", marksheet);

module.exports = {
  Marksheet,
};
