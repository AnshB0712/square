const express = require("express")
const adminRouter = express.Router()

const { addStudent } = require("../controllers/admin/addStudent.js")

adminRouter.post("/add-student",addStudent)


module.exports = {
  adminRouter
}