const jwt = require("jsonwebtoken");
const { APIError } = require("../../utils/apiError.js");
const { JWT_KEY } = require("../../../../../config");
const { StatusCodes } = require("http-status-codes");

const refresh = (req, res) => {
  const { refresh } = req.cookies;

  if (!refresh)
    throw new APIError(StatusCodes.BAD_REQUEST, "You are not logged in.");

  jwt.verify(refresh, JWT_KEY, (err, decoded) => {
    if (err) {
      res.clearCookie("refresh");
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "you're session expired please login again.",
      });
    }

    const { _id, role, name } = decoded;
    const user = { _id, role, name };
    const token = jwt.sign(user, JWT_KEY, {
      expiresIn: "1d",
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "session refreshed.",
      data: { role, name, token },
    });
  });
};

module.exports = { refresh };
