const express = require("express");
const { registerTeacher } = require("../controllers/auth/teacher");

const authRouter = express.Router();

authRouter.post("/register/teacher", registerTeacher);
authRouter.post("/set-password", registerTeacher);

module.exports = { authRouter };
