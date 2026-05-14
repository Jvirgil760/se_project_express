const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
      return value;
    }
    return helpers.error('string.uri');
  }

  module.exports.validateCardBody = celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.empty": 'The "name" field must be filled in',
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
      }),
      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'The "imageUrl" field must be a valid url',
      }),
      weather: Joi.string().required().valid("hot", "warm", "cold").messages({
        "string.empty": 'The "weather" field must be filled in',
        "any.only": 'The "weather" field must be one of: hot, warm, or cold',
      }),
    }),
  });

  module.exports.validateId = celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().alphanum().length(24)
    }),
  });