const express = require("express");
const teacherRouter = express.Router();

const {
  createTest,
  updateTest,
  deleteTest,
  getTests,
  getSingleTest,
} = require("../controllers/teacher/test.js");
const {
  createMarksheet,
  updateMarksheet,
  getMarksheet,
} = require("../controllers/teacher/marksheet");
const { validate } = require("../middlewares/validate");
const {
  validateTest,
  validateDeleteTest,
  validateUpdateTest,
  validateNewMarksheet,
  validateUpdateMarksheet,
} = require("../validations/teacher.validation.js");

const multer = require("multer");
const { fileFilter } = require("../utils/fileFilter.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter });

const MAX_MEDIA_COUNT = 6;

teacherRouter.get("/tests", getTests);
teacherRouter.get("/tests/:testId", getSingleTest);
teacherRouter.get("/marksheet/:testId", getMarksheet);

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

teacherRouter.post(
  "/new-marksheet/:testId",
  validate(validateNewMarksheet),
  createMarksheet
);
teacherRouter.patch(
  "/update-marksheet/:testId",
  validate(validateUpdateMarksheet),
  updateMarksheet
);

module.exports = {
  teacherRouter,
};
