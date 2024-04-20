const express = require("express")
const teacherRouter = express.Router();

const { createTest,updateTest,deleteTest } = require('../controllers/teacher/test.js')
const { validate } = require('../middlewares/validate')
const { validateTest,validateDeleteTest,validateUpdateTest } = require('../validations/teacher.validation.js')

teacherRouter.post("/new-test",validate(validateTest),createTest)
teacherRouter.patch("/update-test",validate(validateUpdateTest),updateTest)
teacherRouter.delete("/delete-test/:testId",validate(validateDeleteTest),deleteTest)

module.exports = {
  teacherRouter
}