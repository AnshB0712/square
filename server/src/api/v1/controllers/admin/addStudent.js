const { genNumericId } = require("../../utils/genUniqueId.js");
const { User } = require("../../models/user");
const { StatusCodes } = require("http-status-codes");

const addStudent = async (req, res) => {
  const { name, role = ["STUDENT"], phone, fees, standard } = req.body;
  const academicYear = req.academicYear;
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

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Student created.",
    data: student,
  });
};

module.exports = {
  addStudent,
};
