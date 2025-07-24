const { registerSchema } = require('../validations/validateUser')
const bcrypt = require('bcrypt')
const Users = require('../models/registerUser')
const userRegister = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body)
    const hashPassword = async (password) => {
        const saltround = 10
        const salt = await bcrypt.genSalt(saltround)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    }
    if (error) {
        return res.status(400).json({ message: "validation failed", error: error })
    }
    const hashPass = await hashPassword(value.password)
    const newUser = new Users({ name: value.name, email: value.email, password: hashPass })

    try {
        const result = await newUser.save();
        return res.status(201).json({ message: "User registered successfully", user: result });
    } catch (err) {

        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Error", error: err.message });
        }
        if (err.code === 11000 && err.name === 'MongoServerError') {
           
            res.status(409).json({
                message: ` already exists`
            });
        }
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
}
module.exports = { userRegister }