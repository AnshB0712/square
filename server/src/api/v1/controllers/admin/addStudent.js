const { genNumericId } = require("../../utils/genUniqueId.js");
const { User } = require("../../models/user");
const { StatusCodes } = require("http-status-codes");

const addStudent = async (req, res) => {
  const { name, role = ["STUDENT"], phone, fees, standard } = req.body;
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;
  const roll = genNumericId();

  const student = await User.create({
    name,
    roll,
    role,
    phone,
    fees,
    academicYear,
    standard,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Student created.",
    data: student,
  });
};

module.exports = {
  addStudent,
};
