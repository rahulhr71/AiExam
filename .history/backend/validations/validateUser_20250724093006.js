const Joi = require('joi');

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Disables .com/.in validation
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')) // At least 1 lowercase, 1 uppercase, 1 digit
    .required()
    .messages({
      'string.pattern.base': 'Password must contain upper, lower case letters and a number',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password must be at most 20 characters',
      'any.required': 'Password is required'
    })
});

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name must be at most 30 characters'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format'
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must include uppercase, lowercase, and number',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password must be at most 20 characters'
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm password must match password',
      'any.required': 'Confirm password is required'
    })
});

// Export schemas
module.exports = {
  registerSchema,
  LoginSchema
};
