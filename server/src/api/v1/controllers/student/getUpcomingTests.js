const { StatusCodes } = require("http-status-codes");
const { Test } = require("../../models/test");
const { User } = require("../../models/user");
const dayjs = require("dayjs");

const getUpcomingTests = async (req, res) => {
  const academicYear = req.academicYear;
  let t;

  const student = await User.findById(req.user._id).lean();

  const startOfToday = dayjs().startOf("day").toDate();
  const startOfTomorrow = dayjs().add(1, "day").startOf("day").toDate();

  t = await Test.find({
    academicYear,
    standard: student.standard,
    on: { $gte: startOfToday, $lt: startOfTomorrow },
  })
    .populate("standard")
    .populate("subject")
    .sort({ on: 1 })
    .lean();

  res.status(StatusCodes.OK).json({
    success: true,
    data: t,
    message: "Test Found.",
  });
};

module.exports = {
  getUpcomingTests,
};
