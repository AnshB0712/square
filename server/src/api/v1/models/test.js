const mongoose = require("mongoose");

const test = new mongoose.Schema(
  {
    name: {
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
      reference: "user",
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      reference: "user",
      required: true,
    },
    forStandard: {
      type: mongoose.SchemaTypes.ObjectId,
      reference: "standard",
      required: true,
    },
    forSubject: {
      type: mongoose.SchemaTypes.ObjectId,
      reference: "subject",
      required: true,
    },
    url: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("test", test);

module.exports = { Test };
