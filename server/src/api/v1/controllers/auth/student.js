const { User } = require("../../models/user");
const { APIError } = require("../../utils/apiError.js");
const { JWT_KEY } = require("../../../../../config");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../utils/createTokens.js");
const { StatusCodes } = require("http-status-codes");

const loginStudent = async (req, res) => {
  const { roll } = req.body;

  const user = await User.findOne({ roll }).lean();

  if (!user)
    throw new APIError(
      StatusCodes.NOT_FOUND,
      "You are not registered with us."
    );

  const { accessToken, refreshToken } = createToken({ ...user });

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: { token: accessToken, role: user.role, name: user.name },
    message: "Your session is created.",
  });
};

module.exports = {
  loginStudent,
};
