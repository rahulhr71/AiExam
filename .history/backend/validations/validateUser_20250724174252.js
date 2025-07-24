const joi = require('joi');

const LoginSchema = joi.object({
  email: joi.string()
    .email({ tlds: { allow: false } }) 
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),

  password: joi.string().min(6).max(20).required().messages({
      'string.pattern.base': 'Password must contain upper, lower case letters and a number',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password must be at most 20 characters',
      'any.required': 'Password is required'
    })
});

const registerSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name must be at most 30 characters'
    }),

  email: joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format'
    }),

  password: joi.string()
    .min(6)
    .max(20).required()
    .messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must include uppercase, lowercase, and number',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password must be at most 20 characters'
    }),

  confirmPassword: joi.any()
    .valid(joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Confirm password must match password',
      'any.required': 'Confirm password is required'
    })
});


module.exports = {
  registerSchema,
  LoginSchema
};
