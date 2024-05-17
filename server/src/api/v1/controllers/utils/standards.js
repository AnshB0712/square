const { StatusCodes } = require("http-status-codes");
const { Standard } = require("../../models/standard");
const { User } = require("../../models/user");

const standards = async (req, res) => {
  const user = req.user;
  const standards = await Standard.find({});
  let data;

  if (user.role.includes("TEACHER")) {
    const { standardAssigned } = await User.findById(user._id).lean();
    data = standards.filter((std) =>
      standardAssigned.find(
        ({ standard }) => standard.toString() === std._id.toString()
      )
    );
  } else {
    data = standards;
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    standards: data,
  });
};

module.exports = { standards };
