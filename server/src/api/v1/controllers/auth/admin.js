const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models/user");
const { APIError } = require("../../utils/apiError");
const { JWT_KEY } = require("../../../../../config");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../../utils/encryptPassword");

const loginAdmin = async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone }).lean();

  if (!user)
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "You are not registered with us."
    );

  if (!user.role.includes("ADMIN"))
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "You are not registered as Admin."
    );

  const isPasswordMatched = comparePassword(password, user.password);

  if (!isPasswordMatched)
    throw new APIError(StatusCodes.BAD_REQUEST, "Password is incorrect.");

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
    },
    JWT_KEY,
    {
      expiresIn: "12d",
    }
  );

  const refresh = jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
    },
    JWT_KEY,
    {
      expiresIn: "365d",
    }
  );

  res.cookie("refresh", refresh, {
    httpOnly: true, // Cookie is accessible only through the HTTP protocol, not JavaScript
    secure: true, // Cookie is only sent over HTTPS
    sameSite: "strict", // Cookie is sent only for same-site requests by default
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      token,
      role: user.role,
      name: user.name,
    },
    message: "You are logged in.",
  });
};

module.exports = {
  loginAdmin,
};
