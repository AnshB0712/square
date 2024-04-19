const mongoose = require("mongoose");
const { APIError } = require("./apiError");
const { MONGO_URL } = require("../../../../config");

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
    throw new APIError(`Error while connecting to DB`, 500);
  }
};

module.exports = { connectToDB };
