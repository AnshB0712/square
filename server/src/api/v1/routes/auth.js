const express = require("express");
const {
  registerTeacher,
  setPassword,
  loginTeacher,
} = require("../controllers/auth/teacher");
const { loginAdmin } = require("../controllers/auth/admin");
const { verifyRole } = require("../middlewares/verifyRole");

const authRouter = express.Router();

authRouter.post("/login/admin", loginAdmin);
authRouter.post("/register/teacher", verifyRole(["ADMIN"]), registerTeacher);
authRouter.post("/login/teacher", loginTeacher);
authRouter.post("/set-password", setPassword);

module.exports = { authRouter };
