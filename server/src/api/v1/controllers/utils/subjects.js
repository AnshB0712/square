const { StatusCodes } = require("http-status-codes");
const { Subject } = require("../../models/subject");

const subjects = async (req, res) => {
  const subjects = await Subject.find({});

  return res.status(StatusCodes.OK).json({
    success: true,
    subjects,
  });
};

module.exports = { subjects };
