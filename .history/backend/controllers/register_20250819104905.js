const { registerSchema } = require("../validations/validateUser");
const bcrypt = require("bcrypt");
const User = require("../models/registerUser");

const userRegister = async (req, res) => {
  try {
  
    const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);

    
    const newUser = new User({
      name: value.name,
      email: value.email,
      password: hashedPassword,
      phone: value.phone,
      role: value.role || "student",
      studentType: value.studentType || "",
      rollOrEmpId: value.rollOrEmpId,
      classOrDept: value.classOrDept,
      address: value.address,
    });

   
    const result = await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
        studentType: result.studentType,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Mongoose Validation Error",
        error: err.message,
      });
    }

    if (err.code === 11000 && err.name === "MongoServerError") {
      return res.status(409).json({
        message: "Duplicate key error - already exists",
      });
    }

    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = { userRegister };
