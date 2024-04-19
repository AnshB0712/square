const { genNumericId } = require("../../utils/genUniqueId.js")
const { User } = require("../../models/user")
const { StatusCodes } = require("http-status-codes")

const addStudent = async (req,res) => {
  const {name,role=["STUDENT"],phone,fees} = req.body
  const currentYear = new Date().getFullYear();
  const acaedmicYear = `${currentYear}-${currentYear+1}`
  const roll = genNumericId()
  
  const student = await User.create({
    name,
    roll,
    role,
    phone,
    fees,
    acaedmicYear
  })
  
  res.status(StatusCode.OK).json({
    success: true,
    message: "Student created.",
    data: student
  })
}

module.exports = {
  addStudent
}
