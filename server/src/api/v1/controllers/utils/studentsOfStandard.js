const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models/user");

const studentsOfStandard = async (req,res) => {
  const { standardId } = req.params
  const academicYear = req.academicYear
  
  const students = await User.find({
    standard: standardId,
    academicYear
  },['name','standard','roll','role','phone','fees','academicYear']).lean()
  
  res.status(StatusCodes.OK).json({
    success: true,
    data: students,
    message: ''
  })
}

module.exports = {
  studentsOfStandard
}