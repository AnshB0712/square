const express = require("express");
const { authRouter } = require("./auth");
const { templateRouter } = require("./template");
const { adminRouter } = require("./admin");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { verifyRole } = require("../middlewares/verifyRole");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/template", templateRouter);
router.use("/admin", verifyJWT, verifyRole(["ADMIN"]), adminRouter);
// router.use("/student", studentRouter);
// router.use("/teacher", teacherRouter);

module.exports = { router };
