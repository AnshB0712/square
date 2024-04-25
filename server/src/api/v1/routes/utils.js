const express = require("express");
const { standards } = require("../controllers/utils/standards");
const { subjects } = require("../controllers/utils/subjects");
const utilsRouter = express.Router();

utilsRouter.get("/standards", standards);
utilsRouter.get("/subjects", subjects);

module.exports = {
  utilsRouter,
};
