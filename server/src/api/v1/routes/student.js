const express = require("express");
const { getUpcomingTests } = require("../controllers/student/getUpcomingTests");
const { getTestInfo } = require("../controllers/student/getTestInfo");
const {
  getPerformanceData,
} = require("../controllers/student/getPerformanceData");
const {
  getEnrolledSubjects,
} = require("../controllers/student/getEnrolledSubjects");

const studentRouter = express.Router();

studentRouter.get("/upcoming-tests", getUpcomingTests);
studentRouter.get("/test-info/:testId", getTestInfo);
studentRouter.get("/enrolled-subjects", getEnrolledSubjects);
studentRouter.get("/performance-data/:subjectId", getPerformanceData);

module.exports = { studentRouter };
