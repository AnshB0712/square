const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models/user");
const { sendMailToUser } = require("../../services/mail");
const { BACKEND_URL, JWT_KEY } = require("../../../../../config");
const jwt = require("jsonwebtoken");

const registerTeacher = async (req, res) => {
  const { name, phone, mail, role, standardAssigned } = req.body;

  const user = await User.create({
    name,
    phone,
    mail,
    role,
    standardAssigned,
  }).lean();

  const token = jwt.sign(user, JWT_KEY, {
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

const setpassword = async (req, res) => {
  const { password, token } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err) {
      res.render("failurepassword.ejs");
    } else {
      const user = decoded;
      await User.findByIdAndUpdate(user._id, { password: hashPassword });
    }
  });

  res.render("successpassword.ejs");
};

module.exports = { registerTeacher, setpassword };
