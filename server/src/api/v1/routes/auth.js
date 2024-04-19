const express = require("express");
const { registerTeacher,setPassword,loginTeacher } = require("../controllers/auth/teacher");

const authRouter = express.Router();

authRouter.post("/register/teacher", registerTeacher);
authRouter.post("/login/teacher", loginTeacher);
authRouter.post("/set-password", setPassword);

module.exports = { authRouter };
