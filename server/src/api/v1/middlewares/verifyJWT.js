const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { APIError } = require("../utils/apiError");
const { JWT_KEY } = require("../../../../config");
const dayjs = require("dayjs");

const verifyJWT = (req, res, next) => {
  // Get token from request headers, query parameters, or cookies
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null || req.cookies.token;

  // Check if token exists
  if (!token) {
    throw new APIError(StatusCodes.FORBIDDEN, "token not provided");
  }

  // Verify token
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      throw new APIError(
        StatusCodes.UNAUTHORIZED,
        "Failed to authenticate token"
      );
    }

    const currentYear = dayjs().year();
    const academicYear = `${currentYear}-${currentYear + 1}`;

    req.academicYear = academicYear;
    req.user = decoded;
    next();
  });
};

module.exports = { verifyJWT };
