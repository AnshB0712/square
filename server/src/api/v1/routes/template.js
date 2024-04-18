const express = require("express");

const templateRouter = express.Router();

templateRouter.get("/set-password/:token", (req, res) => {
  const { token } = req.params;
  res.render("setpassword.ejs", { token: token });
});

module.exports = { templateRouter };
