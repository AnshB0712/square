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

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      token,
    },
    message: "You are logged in.",
  });
};

module.exports = {
  loginAdmin,
};
