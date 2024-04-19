const STANDARDS = [
  { class: "VI", field: "NONE" },
  { class: "VII", field: "NONE" },
  { class: "VIII", field: "NONE" },
  { class: "IX", field: "NONE" },
  { class: "X", field: "NONE" },
  { class: "XI", field: "SCIENCE" },
  { class: "XI", field: "COMMERCE" },
  { class: "XII", field: "SCIENCE" },
  { class: "XII", field: "COMMERCE" },
];
const SUBJECTS = [
  { name: "MATHS" },
  { name: "SCIENCE" },
  { name: "ECONOMICS" },
  { name: "STATISTICS" },
  { name: "O.C" },
  { name: "PHYSICS" },
  { name: "CHEMISTRY" },
  { name: "SOCIAL-SCIENCE" },
  { name: "HINDI" },
  { name: "ENGILSH" },
  { name: "GUJARATI" },
  { name: "SANSKRIT" },
];

const mongoose = require("mongoose");
const { Standard } = require("../models/standard");
const { Subject } = require("../models/subject");

const seed = async () => {
  try {
    // Check if the collection exists
    const standardCollectionExists = await mongoose.connection.db
      .listCollections({ name: "standards" })
      .hasNext();
    const subjectCollectionExists = await mongoose.connection.db
      .listCollections({ name: "subjects" })
      .hasNext();

    const isStandardsEmpty = await Standard.find({});
    const isSubjectsEmpty = await Subject.find({});

    if (!standardCollectionExists || !isStandardsEmpty.length) {
      console.log("standard collection does not exist. Seeding data...");
      // Insert data into the collection
      await Standard.insertMany(STANDARDS);
      console.log("Data seeded successfully");
    }
    if (!subjectCollectionExists || !isSubjectsEmpty.length) {
      console.log("subject collection does not exist. Seeding data...");
      // Insert data into the collection
      await Subject.insertMany(SUBJECTS);
      console.log("Data seeded successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { seed };
