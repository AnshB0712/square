const { StatusCodes } = require("http-status-codes");
const { Standard } = require("../../models/standard");

const standards = async (req, res) => {
  const standards = await Standard.find({});

  return res.status(StatusCodes.OK).json({
    success: true,
    standards,
  });
};

module.exports = { standards };
