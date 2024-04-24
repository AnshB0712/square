const Joi = require("joi");
const { objectId } = require("./custom.validation");

const validateLoginAdmin = {
  body: Joi.object()
    .keys({
      phone: Joi.number().required(),
      password: Joi.string().required(),
    })
    .required(),
};

const validateLoginStudent = {
  body: Joi.object()
    .keys({
      roll: Joi.number().required(),
    })
    .required(),
};

const validateLoginTeacher = {body: Joi.object()
    .keys({
      uniqueField: Joi.number().required(),
      password: Joi.string().required(),
    })
    .required(),
  
};

const validateRegisterTeacher = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      mail: Joi.string().required(),
      phone: Joi.number().required(),
      standardAssigned: Joi.array().items(
    Joi.object({
      standard: Joi.string().custom(objectId).required(),
      subject: Joi.string().custom(objectId).required(), 
    })
  ).required(),
    })
    .required(),
};

module.exports = {
  validateRegisterTeacher,
  validateLoginTeacher,
  validateLoginStudent,
  validateLoginAdmin
};
