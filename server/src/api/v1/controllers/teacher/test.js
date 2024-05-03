const { Test } = require("../../models/test.js");
const { StatusCodes } = require("http-status-codes");
const { uploadMultiMedia } = require("../../services/cloudinary.js");
const { APIError } = require("../../utils/apiError.js");

const createTest = async (req, res) => {
  const user = req.user;
  const files = req.files;
  const academicYear = req.academicYear;

  let { name, description, forStandard, on, forSubject, assignedTo } = req.body;
  let media = [];

  if (!assignedTo) assignedTo = user._id;

  if (files) {
    const urls = await uploadMultiMedia(files);
    media = urls.map((u) => u.secure_url);
  }

  const t = await Test.create({
    name,
    description,
    forStandard,
    forSubject,
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

  const isUserAdmin = req.user.role.includes("ADMIN");
  const isTestOwnerSame = t.createdBy.toString() === user._id.toString();

  if (!isTestOwnerSame && !isUserAdmin)
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "cannot edit test as it is not created by you."
    );

  const files = req.files;
  let url;

  if (files.length) {
    url = await uploadMultiMedia(files);
  }

  const u = await Test.findByIdAndUpdate(
    testId,
    {
      ...data,
      ...(url
        ? {
            url: url.map((u) => u.secure_url),
          }
        : {}),
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

  const isUserAdmin = req.user.role.includes("ADMIN");
  const isTestOwnerSame = t.createdBy.toString() === user._id.toString();

  if (!isTestOwnerSame || !isUserAdmin)
    throw new APIError(
      StatusCodes.BAD_REQUEST,
      "cannot delete test as it is not created by you."
    );

  await Test.findByIdAndDelete(testId);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Test is deleted",
  });
};

const getTests = async (req, res) => {
  try {
    const user = req.user;
    const academicYear = req.academicYear;
    let t;

    if (user.role.includes("ADMIN")) {
      t = await Test.find({ academicYear })
        .populate("forStandard")
        .populate("forSubject")
        .populate("assignedTo")
        .lean();
    } else {
      t = await Test.find({
        academicYear,
        createdBy: user._id,
        assignedTo: user._id,
      })
        .populate("forStandard")
        .populate("forSubject")
        .populate("assignedTo")
        .lean();
    }

    res.status(200).json({
      success: true,
      data: t,
      message: "Test Found.",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTest,
  updateTest,
  deleteTest,
  getTests,
};
