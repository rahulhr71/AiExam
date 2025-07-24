const { LoginSchema } = require('../validations/validateUser')
const Users = require('../models/registerUser')
const userLogin = (req, res) => {
    const { error, value } = LoginSchema.validateAsync(req.body)
    if (error) return res.status(400).json({ message: "validation failed", error: error })
    const user = Users.findOne({ email: value.email })
    if (!user) {
        return res.status(401).json({ message: "user Not Found" })
    }
    return res.status(200).json({message:"user found"})
}
module.exports = { userLogin }

