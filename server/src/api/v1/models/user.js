const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String
    },
    fees:{
      type: Number
    },
    roll: {
      type: Number,
      unique: true,
    },
    standard: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    password: {
      type: String
    },
    standardAssigned: [
      {
        standard: {
          type: mongoose.SchemaTypes.ObjectId,
        },
        subject: {
          type: mongoose.SchemaTypes.ObjectId,
        },
      },
    ],
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: [String],
      enum: ["ADMIN", "TEACHER", "STUDENT"],
      default: ["STUDENT"],
    },
    mail: {
      type: String,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", user);

module.exports = { User };
