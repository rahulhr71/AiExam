const { LoginSchema } = require('../validations/validateUser')
const Users = require('../models/registerUser')
const userLogin = async(req, res) => {
    const { error, value } = LoginSchema.validate(req.body)
    if (error) return res.status(400).json({ message: "validation failed", error: error })
    let email=value.email
    const user = await Users.findOne({ email})
    if (!user) {
        return res.status(404).json({ message: "user Not Found" })
    }
    return res.status(200).json({message:"user found"}) 
}
module.exports = { userLogin }

