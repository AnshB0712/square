const { User } = require("../../models/user");
const { APIError } = require("../../utils/apiError.js");
const { JWT_KEY } = require("../../../../../config");
const jwt = require("jsonwebtoken");

const loginStudent = async (req, res) => {
  const { roll } = req.body;

  const user = await User.findOne({ roll });

  if (!user)
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "You are not registered with us."
    );

  const token = jwt.sign(user, JWT_KEY, {
    expireIn: "1d",
  });
  const refresh = jwt.sign(user, JWT_KEY, {
    expireIn: "30d",
  });

  res.cookie("refresh", refresh, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: { token, role: user.role, name: user.name },
    message: "Your session is created.",
  });
};

module.exports = {
  loginStudent,
};
