const express = require("express");
const adminRouter = express.Router();
const { validate } = require("../middlewares/validate.js");
const { addStudent } = require("../controllers/admin/addStudent.js");
const {
  addStudent: validateStudent,
  assignClassSubject: validateAssign,
} = require("../validations/admin.validation.js");
const {
  assignClassSubject,
} = require("../controllers/admin/assignClassSubject.js");

adminRouter.post("/add-student", validate(validateStudent), addStudent);
adminRouter.post(
  "/assign-class-subject/:teacherId",
  validate(validateAssign),
  assignClassSubject
);

module.exports = {
  adminRouter,
};
