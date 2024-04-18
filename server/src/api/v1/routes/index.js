const express = require("express");
const { authRouter } = require("./auth");
const { templateRouter } = require("./template");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/template", templateRouter);
// router.use("/admin", adminRouter);
// router.use("/student", studentRouter);
// router.use("/teacher", teacherRouter);

module.exports = { router };
