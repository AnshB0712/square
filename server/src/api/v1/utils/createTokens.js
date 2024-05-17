const jwt = require("jsonwebtoken");
const {
  JWT_KEY,
  JWT_ACCESS_EXP,
  JWT_REFRESH_EXP,
} = require("../../../../config");

createToken = (payload) => {
  const accessToken = jwt.sign(payload, JWT_KEY, {
    expiresIn: JWT_ACCESS_EXP,
  });

  const refreshToken = jwt.sign(payload, JWT_KEY, {
    expiresIn: JWT_REFRESH_EXP,
  });

  return { accessToken, refreshToken };
};

module.exports = { createToken };
