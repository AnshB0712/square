const express = require("express");
const teacherRouter = express.Router();

const {
  createTest,
  updateTest,
  deleteTest,
  getTests,
  getSingleTest
} = require("../controllers/teacher/test.js");
const { validate } = require("../middlewares/validate");
const {
  validateTest,
  validateDeleteTest,
  validateUpdateTest,
} = require("../validations/teacher.validation.js");

const multer = require("multer");
const { fileFilter } = require("../utils/fileFilter.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter });

const MAX_MEDIA_COUNT = 6;

teacherRouter.get("/tests", getTests);
teacherRouter.get("/tests/:testId", getSingleTest);
teacherRouter.post(
  "/new-test",
  upload.array("file[]", MAX_MEDIA_COUNT),
  validate(validateTest),
  createTest
);
teacherRouter.patch(
  "/update-test/:testId",
  validate(validateUpdateTest),
  updateTest
);
teacherRouter.delete(
  "/delete-test/:testId",
  validate(validateDeleteTest),
  deleteTest
);

module.exports = {
  teacherRouter,
};
