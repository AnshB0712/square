const express = require("express");
const {
  registerTeacher,
  setPassword,
  loginTeacher,
} = require("../controllers/auth/teacher");
const { loginAdmin } = require("../controllers/auth/admin");
const { verifyRole } = require("../middlewares/verifyRole");
const { refresh } = require("../controllers/auth/refreshtoken");

const authRouter = express.Router();

authRouter.post("/refresh-session", refresh);
authRouter.post("/login/admin",
validate(validateLoginAdmin),
loginAdmin);
authRouter.post("/register/teacher", verifyRole(["ADMIN"]),
validate(validateRegisterTeacher),
registerTeacher);
authRouter.post("/login/teacher",
validate(validateLoginTeacher),
loginTeacher);
authRouter.post("/login/student",
validate(validateLoginStudent),
loginStudent);
authRouter.post("/set-password", setPassword);

module.exports = { authRouter };
