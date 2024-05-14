const express = require("express");
const { getUpcomingTests } = require("../controllers/student/getUpcomingTests");
const { getTestInfo } = require("../controllers/student/getTestInfo");

const studentRouter = express.Router();

studentRouter.get("/upcoming-tests", getUpcomingTests);
studentRouter.get("/test-info/:testId", getTestInfo);

module.exports = { studentRouter };
