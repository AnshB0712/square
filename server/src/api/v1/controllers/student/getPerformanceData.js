const { Subject } = require("../../models/subject");
const { User } = require("../../models/user");
const { Test } = require("../../models/test");
const { APIError } = require("../../middlewares/errorMiddleware");
const { StatusCodes } = require("http-status-codes");
const { ObjectId } = require("mongoose").Types;

const getPerformanceData = async (req, res) => {
  const user = req.user;
  const { subjectId } = req.params;

  const subject = await Subject.findById(subjectId);
  if (!subject) throw new APIError(StatusCodes.NOT_FOUND);

  const studentId = user._id;
  const student = await User.findById(studentId).lean();

  const pipeline = [
    // Match tests for the given subjectId and standardId
    {
      $match: {
        subject: ObjectId(subjectId),
        standard: student.standard,
      },
    },
    // Lookup marksheet for each test
    {
      $lookup: {
        from: "marksheets",
        localField: "_id",
        foreignField: "test",
        as: "marksheet",
      },
    },
    // Unwind to deconstruct the array from the lookup
    {
      $unwind: {
        path: "$marksheet",
        preserveNullAndEmptyArrays: true, // Preserve tests without marksheet
      },
    },
    // Filter out tests without marksheet
    {
      $match: {
        marksheet: { $exists: true },
      },
    },
    // Project to get necessary fields
    {
      $project: {
        on: 1, // date of the test,
        marks: `$marksheet.sheet.${studentId}.marks`,
        total: "$marksheet.fullMarksOfTest",
        percentage: {
          $cond: {
            if: {
              $eq: [
                {
                  $type: {
                    $ifNull: ["$marksheet.sheet." + studentId + ".marks", null],
                  },
                },
                "int",
              ],
            },
            then: {
              $multiply: [
                {
                  $divide: [
                    {
                      $ifNull: ["$marksheet.sheet." + studentId + ".marks", 0],
                    },
                    { $ifNull: ["$marksheet.fullMarksOfTest", 1] },
                  ],
                },
                100,
              ],
            },
            else: null,
          },
        },
      },
    },
    {
      $sort: {
        on: 1, // 1 for ascending order, -1 for descending order
      },
    },
  ];

  const data = await Test.aggregate(pipeline);

  res.status(StatusCodes.OK).json({
    message: "done",
    success: true,
    data,
  });
};

module.exports = {
  getPerformanceData,
};
