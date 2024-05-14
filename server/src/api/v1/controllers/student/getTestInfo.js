const { Test } = require("../../models/test");

const getTestInfo = async (req, res) => {
  const { testId } = req.params;
  const academicYear = req.academicYear;

  const t = await Test.findOne({
    _id: testId,
    academicYear,
  })
    .populate("subject")
    .populate("standard")
    .lean();

  if (!t)
    throw new APIError(StatusCodes.NOT_FOUND, "No test found with this id.");

  res.status(200).json({
    success: true,
    data: t,
    message: "Test Found.",
  });
};

module.exports = { getTestInfo };
