const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must be at most 30 characters",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must include uppercase, lowercase, and number",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 20 characters",
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password must match password",
      "any.required": "Confirm password is required",
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone must be 10 digits",
    }),

  role: Joi.string()
    .valid("student", "teacher", "admin")
    .default("student"),

  studentType: Joi.string()
    .valid("school", "college", "")
    .allow("")
    .messages({
      "any.only": "Student type must be either 'school' or 'college'",
    }),

  rollOrEmpId: Joi.string()
    .required()
    .messages({
      "string.empty": "Roll Number or Employee ID is required",
    }),

  classOrDept: Joi.string()
    .required()
    .messages({
      "string.empty": "Class or Department is required",
    }),

  address: Joi.string()
    .required()
    .messages({
      "string.empty": "Address is required",
    }),
});

module.exports = { registerSchema };
