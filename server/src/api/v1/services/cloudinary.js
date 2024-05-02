var { v2: cloudinary } = require("cloudinary");
const { Readable } = require("stream");
const CLOUDINARY_FOLDER = "square/papers";

const c = cloudinary.config({
  cloud_name: "dvpjtayzu",
  api_key: "141743341442183",
  api_secret: "8Te8YsGt7hjCoEWe4w6vvyXkRfs",
});

const uploadMedia = async (file) => {
  try {
    if (!file) throw new Error("No file passed to upload.");

    const result = await cloudinary.uploader.upload(file.name, {
      folder: CLOUDINARY_FOLDER,
    });
    console.log("Media uploaded to Cloudinary:", result);
    return result; // Return the secure URL of the uploaded media
  } catch (error) {
    console.error("Error uploading media to Cloudinary:", error);
    throw new Error("Media upload failed.");
  }
};

const uploadStream = (buffer) => {
  return new Promise((res, rej) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: CLOUDINARY_FOLDER,
        overwrite: true,
      },
      (err, result) => {
        if (err) return rej(err);
        res(result);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(theTransformStream);
  });
};

const uploadMultiMedia = async (files) => {
  try {
    if (!files) throw new Error("No files passed to upload.");

    let results = [];

    for (const file of files) {
      const res = await uploadStream(file.buffer);
      results.push(res);
    }

    return results;
  } catch (err) {
    console.log(err);
    throw new Error(`Error uploading media to Cloudinary :->> ${err.message}`);
  }
};

module.exports = {
  uploadMedia,
  uploadMultiMedia,
};
