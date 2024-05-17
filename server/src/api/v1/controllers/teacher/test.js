const { Test } = require("../../models/test.js");
const { StatusCodes } = require("http-status-codes");
const { uploadMultiMedia } = require("../../services/cloudinary.js");
const { APIError } = require("../../utils/apiError.js");
const dayjs = require("dayjs");

const createTest = async (req, res) => {
  const user = req.user;
  const files = req.files;
  const academicYear = req.academicYear;

  let { name, description, standard, on, subject, assignedTo } = req.body;
  let media = [];

  if (!assignedTo) assignedTo = user._id;

  if (files) {
    const urls = await uploadMultiMedia(files);
    media = urls.map((u) => u.secure_url);
  }

  const t = await Test.create({
    name,
    description,
    standard,
    subject,
    assignedTo,
    academicYear,
    createdBy: user._id,
    on,
    url: media,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Test is Created",
    data: t,
  });
};
const updateTest = async (req, res) => {
  const { testId } = req.params;
  const user = req.user;
  const data = req.body;

  const t = await Test.findById(testId).lean();

  if (!t)
    throw new APIError(StatusCodes.NOT_FOUND, "No test found with this id.");

  const isUserAdmin = req.user.role.includes("ADMIN");
  const isTestOwnerSame = t.createdBy.toString() === user._id.toString();

  if (!isTestOwnerSame && !isUserAdmin)
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "cannot edit test as it is not created by you."
    );

  if (dayjs(dayjs().toDate()).isAfter(t.on)) {
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "cannot edit test after its already held."
    );
  }

  const u = await Test.findByIdAndUpdate(
    testId,
    {
      ...data,
    },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Test is updated",
    data: u,
  });
};
const deleteTest = async (req, res) => {
  const { testId } = req.params;
  const user = req.user;

  const t = await Test.findById(testId).lean();

  if (!t)
    throw new APIError(StatusCodes.NOT_FOUND, "No test found with this id.");

  const isUserAdmin = req.user.role.includes("ADMIN");
  const isTestOwnerSame = t.createdBy.toString() === user._id.toString();

  if (!isTestOwnerSame || !isUserAdmin)
    throw new APIError(
      StatusCodes.FORBIDDEN,
      "cannot delete test as it is not created by you."
    );

  await Test.findByIdAndDelete(testId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Test is deleted",
  });
};
const getSingleTest = async (req, res) => {
  const { testId } = req.params;
  const user = req.user;
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
const getTests = async (req, res) => {
  const user = req.user;
  const academicYear = req.academicYear;
  let t;

  const startOfToday = dayjs().startOf("day").toDate();
  const startOfTomorrow = dayjs().add(1, "day").startOf("day").toDate();

  t = await Test.find({
    academicYear,
    on: { $gte: startOfToday, $lt: startOfTomorrow },
  })
    .populate("standard")
    .populate("subject")
    .populate("assignedTo", ["name", "role", "_id"])
    .populate("createdBy", ["name", "role", "_id"])
    .sort({ on: 1 })
    .lean();

  // Adding Boolean for Frontend to know on what test a Logged-In user can EDIT-TEST/MAKE-MARKSHEET-OF-TEST/EDIT-MARKSHEET
  if (t.length) {
    t = t.map((test) => {
      let canTakeAction = false;

      if (
        test.createdBy._id.toString() === user._id ||
        test.assignedTo._id.toString() === user._id ||
        user.role.includes("ADMIN")
      ) {
        canTakeAction = true;
      }

      return { ...test, canTakeAction };
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: t,
    message: "Test Found.",
  });
};

module.exports = {
  createTest,
  updateTest,
  deleteTest,
  getTests,
  getSingleTest,
};
