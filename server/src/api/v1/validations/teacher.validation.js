const Joi = require("joi");
const { objectId } = require("./custom.validation");

const validateTest = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      on: Joi.date().required(),
      assignedTo: Joi.string().custom(objectId),
      standard: Joi.string().custom(objectId).required(),
      subject: Joi.string().custom(objectId).required(),
    })
    .required(),
};

const validateDeleteTest = {
  params: {
    testId: Joi.string().custom(objectId).required(),
  },
};

const validateUpdateTest = {
  params: {
    testId: Joi.string().custom(objectId).required(),
  },
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      on: Joi.date(),
      standard: Joi.string().custom(objectId),
      subject: Joi.string().custom(objectId),
    })
    .required(),
};

const validateNewMarksheet = {
  params: {
    testId: Joi.string().custom(objectId).required(),
  },
  body: Joi.object()
    .keys({
      fullmarks: Joi.number().required(),
      sheet: Joi.object().required(),
    })
    .required(),
};

const validateUpdateMarksheet = {
  params: {
    testId: Joi.string().custom(objectId).required(),
  },
  body: Joi.object()
    .keys({
      fullMarksOfTest: Joi.number().required(),
      sheet: Joi.object().required(),
    })
    .min(1),
};

module.exports = {
  validateTest,
  validateDeleteTest,
  validateUpdateTest,
  validateNewMarksheet,
  validateUpdateMarksheet,
};
