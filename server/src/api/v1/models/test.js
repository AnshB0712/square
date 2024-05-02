const mongoose = require("mongoose");

const test = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    on: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: mongoose.SchemaTypes.ObjectId,
      reference: "User",
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      reference: "User",
      required: true,
    },
    forStandard: {
      type: mongoose.SchemaTypes.ObjectId,
      reference: "Standard",
      required: true,
    },
    forSubject: {
      type: mongoose.SchemaTypes.ObjectId,
      reference: "Subject",
      required: true,
    },
    url: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", test);

module.exports = { Test };
