const express = require("express");
const { authRouter } = require("./auth");
const { templateRouter } = require("./template");
const { adminRouter } = require("./admin");
const { teacherRouter } = require("./teacher");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { verifyRole } = require("../middlewares/verifyRole");
const { utilsRouter } = require("./utils");
const { studentRouter } = require("./student");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/template", templateRouter);
router.use("/admin", verifyJWT, verifyRole(["ADMIN"]), adminRouter);
router.use(
  "/teacher",
  verifyJWT,
  verifyRole(["ADMIN", "TEACHER"]),
  teacherRouter
);
router.use("/student", verifyJWT, verifyRole(["STUDENT"]), studentRouter);
router.use("/utils", utilsRouter);

module.exports = { router };
