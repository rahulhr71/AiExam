const  { LoginSchema } = require('../validations/validateUser')
const User=requie
const userLogin = (req, res) => {
    const { error, value } = LoginSchema.validateAsync(req.body)
    if (error) return res.status(400).json({ message: "validation failed", error: error })
    
}
module.exports={userLogin}

