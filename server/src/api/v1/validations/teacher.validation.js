const Joi = require("joi");
const { objectId } = require("./custom.validation");

const validateTest = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      on: Joi.date().required(),
      forStandard: Joi.string().custom(objectId).required(),
      forSubject: Joi.string().custom(objectId).required(),
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
      forStandard: Joi.string().custom(objectId),
      forSubject: Joi.string().custom(objectId),
    })
    .required(),
};

module.exports = {
  validateTest,
  validateDeleteTest,
  validateUpdateTest,
};
