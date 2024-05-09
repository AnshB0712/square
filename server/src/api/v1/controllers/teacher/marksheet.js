const { Test } = require("../../models/test.js");
const { Marksheet } = require("../../models/marksheet.js");
const { User } = require("../../models/user.js");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../../utils/apiError.js");

const createMarksheet = async (req, res) => {
  const { testId } = req.params;
  const { marksheet, fullMarksOfTest } = req.body;
  const academicYear = req.academicYear;

  const t = await Test.findById(testId);

  if (!t)
    throw new APIError(
      StatusCodes.NOT_FOUND,
      "test don't exists with this testId."
    );

  const m = await Marksheet.create({
    test: testId,
    sheet: marksheet,
    academicYear,
    fullMarksOfTest,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: m,
    message: "marksheet for this test is created.",
  });
};

const updateMarksheet = async (req, res) => {
  const { testId } = req.params;
  const data = req.body;

  const t = await Test.findById(testId);

  if (!t)
    throw new APIError(
      StatusCodes.NOT_FOUND,
      "test don't exists with this testId."
    );

  const m = await Marksheet.findOneAndUpdte(
    { test: testId },
    { ...data },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: m,
    message: "marksheet for this test is updated.",
  });
};

const getMarksheet = async (req, res) => {
  const { testId } = req.params;

  const t = await Test.findById(testId);

  if (!t)
    throw new APIError(
      StatusCodes.NOT_FOUND,
      "test don't exists with this testId."
    );

  const m = await Marksheet.findOne({ test: testId });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: m,
    message: ".",
  });
};

const getMarksheetDetails = async (req, res) => {
  const { testId } = req.params;
  const academicYear = req.academicYear;

  const t = await Test.findById(testId)
    .populate("standard")
    .populate("subject")
    .lean();

  if (!t)
    throw new APIError(
      StatusCodes.NOT_FOUND,
      "test don't exists with this testId."
    );

  const students = await User.find({
    academicYear,
    standard: t.standard,
  }).lean();

  const m = await Marksheet.findOne({ test: testId }).lean();

  res.status(StatusCodes.OK).json({
    success: true,
    data: {
      t,
      m,
      students,
    },
    message: ".",
  });
};

module.exports = {
  getMarksheet,
  createMarksheet,
  updateMarksheet,
  getMarksheetDetails,
};
