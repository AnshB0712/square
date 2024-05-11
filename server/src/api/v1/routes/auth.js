const express = require("express");
const {
  registerTeacher,
  setPassword,
  loginTeacher,
} = require("../controllers/auth/teacher");
const { loginStudent } = require("../controllers/auth/student");
const { validate } = require("../middlewares/validate.js");
const { loginAdmin } = require("../controllers/auth/admin");
const { verifyRole } = require("../middlewares/verifyRole");
const { verifyJWT } = require("../middlewares/verifyJWT.js");
const { refresh, logout } = require("../controllers/auth/refreshtoken");

const {
  validateLoginAdmin,
  validateLoginTeacher,
  validateRegisterTeacher,
  validateLoginStudent,
} = require("../validations/auth.validation.js");

const authRouter = express.Router();

authRouter.get("/refresh-session", refresh);
authRouter.post("/login/admin", validate(validateLoginAdmin), loginAdmin);
authRouter.post(
  "/register/teacher",
  verifyJWT,
  verifyRole(["ADMIN"]),
  validate(validateRegisterTeacher),
  registerTeacher
);
authRouter.post("/login/teacher", validate(validateLoginTeacher), loginTeacher);
authRouter.post("/login/student", validate(validateLoginStudent), loginStudent);
authRouter.post("/set-password", setPassword);

authRouter.get("/logout", logout);

module.exports = { authRouter };
