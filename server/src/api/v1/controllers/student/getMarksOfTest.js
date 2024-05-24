const { Marksheet } = require('../../models/marksheet')
const { APIError } = require('../../utils/apiError')
const { StatusCodes } = require('http-status-codes')
const { ObjectId } = require('mongoose').Types

const getMarksOfTest = async (req, res) => {
  const user = req.user
  const { testId } = req.params

  const studentId = user._id

  const pipeline = [
    // Match tests for the given subjectId and standardId
    {
      $match: {
        test: ObjectId(testId),
      },
    },
    // Lookup marksheet for each test
    {
      $lookup: {
        from: 'tests',
        localField: 'test',
        foreignField: '_id',
        as: 'test',
      },
    },
    {
      $unwind: {
        path: '$test',
        preserveNullAndEmptyArrays: true, // Preserve tests without marksheet
      },
    },
    {
      $lookup: {
        from: 'subjects',
        localField: 'test.subject',
        foreignField: '_id',
        as: 'subject',
      },
    },
    {
      $unwind: {
        path: '$subject',
        preserveNullAndEmptyArrays: true, // Preserve tests without marksheet
      },
    },
    // Project to get necessary fields
    {
      $project: {
        on: 1, // date of the test,
        subject: 1,
        marks: `$sheet.${studentId}.marks`,
        total: '$fullMarksOfTest',
        percentage: {
          $cond: {
            if: {
              $eq: [
                {
                  $type: {
                    $ifNull: ['$sheet.' + studentId + '.marks', null],
                  },
                },
                'int',
              ],
            },
            then: {
              $multiply: [
                {
                  $divide: [
                    {
                      $ifNull: ['$sheet.' + studentId + '.marks', 0],
                    },
                    { $ifNull: ['$fullMarksOfTest', 1] },
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
  ]

  const data = await Marksheet.aggregate(pipeline)

  res.status(StatusCodes.OK).json({
    message: 'done',
    success: true,
    data,
  })
}

module.exports = {
  getMarksOfTest,
}
