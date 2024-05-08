const express = require("express");
const { standards } = require("../controllers/utils/standards");
const { subjects } = require("../controllers/utils/subjects");
const {
  studentsOfStandard,
} = require("../controllers/utils/studentsOfStandard.js");
const utilsRouter = express.Router();

utilsRouter.get("/standards", standards);
utilsRouter.get("/subjects", subjects);
utilsRouter.get("/students/standard/:standardId", studentsOfStandard);

module.exports = {
  utilsRouter,
};
