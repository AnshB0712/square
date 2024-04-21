const { User } = require("../../models/user");

const loginStudent = async (req, res) => {
  const { roll } = req.body;

  const user = await User.findOne({ roll });

  if (!user)
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "You are not registered with us."
    );

  // CREATE SESSION

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Your session is created.",
  });
};

module.exports = {
  loginStudent,
};
