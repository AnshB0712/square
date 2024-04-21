const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../../../../config");
const { StatusCodes } = require("http-status-codes");

const refresh = (req, res) => {
  const { refresh } = req.cookies;

  jwt.verify(refresh, JWT_KEY, (err, decoded) => {
    if (err) {
      res.clearCookies();
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "you're session expired please login again.",
      });
    }

    const user = decoded;
    const token = jwt.sign(user, JWT_KEY, {
      expiresIn: "3600",
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "session refreshed.",
      token,
    });
  });
};

module.exports = { refresh };
