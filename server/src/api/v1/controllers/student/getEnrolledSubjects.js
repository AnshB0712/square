const { StatusCodes } = require("http-status-codes");
const { Marksheet } = require("../../models/marksheet");

const getEnrolledSubjects = async (req, res) => {
  const studentId = req.user._id;

  const pipeline = [
    // Match marksheets where the studentId key exists in the sheet object
    {
      $match: {
        ["sheet." + studentId]: { $exists: true },
      },
    },
    // Lookup corresponding test documents
    {
      $lookup: {
        from: "tests", // Assuming "tests" is the collection name for the test schema
        localField: "test",
        foreignField: "_id",
        as: "test",
      },
    },
    // Unwind the test array
    {
      $unwind: "$test",
    },
    // Lookup corresponding subject documents
    {
      $lookup: {
        from: "subjects", // Assuming "subjects" is the collection name for the subject schema
        localField: "test.subject",
        foreignField: "_id",
        as: "subject",
      },
    },
    {
      $unwind: {
        path: "$subject",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$subject",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ];

  const data = await Marksheet.aggregate(pipeline);

  res.status(StatusCodes.OK).json({
    data,
    success: true,
    message: "done",
  });
};

module.exports = { getEnrolledSubjects };
