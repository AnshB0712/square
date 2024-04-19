const { Error } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../utils/apiError");
const { AxiosError } = require("axios");

const errorMiddleware = (err, req, res, next) => {
  
  console.log(err)
  
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof AxiosError) {
    return res
      .status(err.response?.data?.responseCode ?? err.response?.data?.status)
      .json({ message: err.response?.data?.message });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.data, message: "Something went wrong!" + err.message });
};

module.exports = { errorMiddleware };
