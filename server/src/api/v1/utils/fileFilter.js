const fileFilter = (req, file, cb) => {
  // Check if the file type is an image
  if (
    file.mimetype.startsWith("image/") &&
    ["jpg", "jpeg", "png"].includes(
      file.originalname.split(".").pop().toLowerCase()
    )
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only JPG, JPEG, and PNG images are allowed"), false); // Reject the file
  }
};

module.exports = {
  fileFilter,
};
