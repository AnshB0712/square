const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models/user");
const { APIError } = require("../../utils/apiError.js");
const { sendMailToUser } = require("../../services/mail");
const {
  hashPassword,
  comparePassword,
} = require("../../utils/encryptPassword");
const { BACKEND_URL, JWT_KEY } = require("../../../../../config");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../utils/createTokens.js");

const registerTeacher = async (req, res) => {
  const { name, phone, mail, standardAssigned } = req.body;

  const user = await User.create({
    name,
    phone,
    mail,
    role: ["TEACHER"],
    standardAssigned,
  });

  const token = jwt.sign(user.toObject(), JWT_KEY, {
    expiresIn: "1d",
  });

  const generatePasswordLink = `${BACKEND_URL}/api/v1/template/set-password/${token}`;

  await sendMailToUser({
    to: mail,
    subject: "Add Password to your Account",
    text: `click on the link to add password to your account: ${generatePasswordLink}`,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "teacher registered successfuly",
    data: [],
  });
};

const setPassword = async (req, res) => {
  const { password, token } = req.body;
  const hash = hashPassword(password);

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err) {
      res.render("failurepassword.ejs");
    } else {
      const user = decoded;
      await User.findByIdAndUpdate(user._id, { password: hash });
    }
  });

  res.render("successpassword.ejs");
};

const loginTeacher = async (req, res) => {
  const { uniqueField, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(uniqueField);
  let user;

  if (isEmail)
    user = await User.findOne({
      mail: uniqueField,
    });
  else
    user = await User.findOne({
      phone: uniqueField,
    });

  if (!user)
    throw new APIError(
      StatusCodes.NOT_FOUND,
      "You are not registered with us."
    );

  const isPasswordMatched = comparePassword(password, user.password);

  if (!isPasswordMatched)
    throw new APIError(StatusCodes.UNAUTHORIZED, "Password is incorrect.");

  const { accessToken, refreshToken } = createToken({
    _id: user._id,
    role: user.role,
    name: user.name,
  });

  res.cookie("refresh", refreshToken, {
    httpOnly: true, // Cookie is accessible only through the HTTP protocol, not JavaScript
    secure: true, // Cookie is only sent over HTTPS
    sameSite: "none", // Cookie is sent only for same-site requests by default
  });

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      token: accessToken,
      role: user.role,
      name: user.name,
    },
    message: "You are logged in.",
  });
};

module.exports = { registerTeacher, setPassword, loginTeacher };
