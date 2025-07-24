
const  { registerSchema } = require('../validations/validateUser')
const Users =require('../models/registerUser')
const userRegister = (req, res) => {
    const { error, value } = registerSchema.validate(req.body)
    if (error) {
        console.log(error);
        
        return  res.status(400).json({ message: "validation failed", error: error })
    }
    console.log(value);
    return res.status(200).json({ message: "success register" })
}
module.exports={userRegister}