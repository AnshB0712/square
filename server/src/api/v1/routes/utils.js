const express = require("express");
const { standards } = require("../controllers/utils/standards");
const utilsRouter = express.Router();

utilsRouter.get("/standards", standards);

module.exports = {
  utilsRouter,
};
