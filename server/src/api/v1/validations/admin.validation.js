const Joi = require("joi");
const { objectId } = require("./custom.validation");

const addStudent = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      phone: Joi.number().required(),
      fees: Joi.number().required(),
      standard: Joi.string().required().custom(objectId),
    })
    .required(),
};

const assignClassSubject = {
  params: {
    teacherId: Joi.string().custom(objectId).required(),
  },
  body: Joi.object()
    .keys({
      assign: Joi.array()
        .items(
          Joi.object({
            standard: Joi.string().custom(objectId).required(),
            subject: Joi.string().custom(objectId).required(),
          })
        )
        .required(),
    })
    .required(),
};

module.exports = {
  addStudent,
  assignClassSubject,
};
