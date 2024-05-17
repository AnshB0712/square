const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models/user");
const { APIError } = require("../../utils/apiError");

const assignClassSubject = async (req, res) => {
  const { teacherId } = req.params;
  const { assign } = req.body;

  const teacher = await User.find({
    _id: teacherId,
    role: { $in: ["TEACHER"] },
  }).lean();

  if (!teacher)
    throw new APIError(StatusCodes.NOT_FOUND, "No teacher with ID exists.");

  const t = await User.findByIdAndUpdate(
    teacherId,
    {
      standardAssigned: assign,
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Subjects and Standard assigned.",
    data: t,
  });
};

module.exports = {
  assignClassSubject,
};
