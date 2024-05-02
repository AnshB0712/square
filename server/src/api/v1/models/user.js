const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
    },
    fees: {
      type: Number,
    },
    roll: {
      type: Number,
    },
    standard: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Standard",
    },
    password: {
      type: String,
    },
    standardAssigned: {
      type: [
        {
          standard: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Standard",
          },
          subject: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Subject",
          },
        },
      ],
    },
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
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", user);

module.exports = { User };
