const { StatusCodes } = require("http-status-codes");
const { Subject } = require("../../models/subject");
const { User } = require("../../models/user");

const subjects = async (req, res) => {
  const user = req.user;
  const subjects = await Subject.find({});
  let data;

  if (user.role.includes("TEACHER")) {
    const { standardAssigned } = await User.findById(user._id).lean();
    data = subjects.filter((sub) =>
      standardAssigned.find(
        ({ subject }) => subject.toString() === sub._id.toString()
      )
    );
  } else {
    data = subjects;
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    subjects: data,
  });
};

module.exports = { subjects };
