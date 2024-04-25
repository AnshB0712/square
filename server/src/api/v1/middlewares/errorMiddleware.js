const { Error } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../utils/apiError");
const { AxiosError } = require("axios");

const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof APIError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, success: false });
  }

  if (err instanceof AxiosError) {
    return res
      .status(err.response?.data?.responseCode ?? err.response?.data?.status)
      .json({ message: err.response?.data?.message });
  }

  if (err.code === 11000)
    err.message = `${
      Object.keys(err.keyPattern)[0]
    } is already in use. enter different value`;

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ InterlError: true, message: err.message });
};

module.exports = { errorMiddleware };
