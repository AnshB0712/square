const Joi = require("joi");
const { objectId } = require("./custom.validation");


const validateTest = {
  body: joi.object().keys({
    name: joi.string().required(),
    description: joi.string().required(),
    on: joi.date().required(),
    forStandard: joi.string().custom(objectId).required(),
  })
}

const validateDeleteTest = {
  params: {
    testId: joi.string().custom(objectId).required()
  }

const validateUpdateTest = {
  params: {
    testId: joi.string().custom(objectId).required()
  },
  body: joi.object().keys({
    name: joi.string(),
    description: joi.string(),
    on: joi.date(),
    forStandard: joi.string().custom(objectId),
  }).min(1)
}

module.exports = {
  validateTest,
  validateDeleteTest,
  validateUpdateTest
}