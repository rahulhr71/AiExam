const  { LoginSchema } = require('../validations/validateUser')
const userLogin = (req, res) => {
    const { error, value } = LoginSchema.validateAsync(req.body)
    if (error) return res.status(400).json({ message: "validation failed", error: error })
    console.log(value.email);
    return res.status(200).json({ message: "success login" })
}
module.exports={userLogin}

