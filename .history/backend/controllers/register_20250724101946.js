
const  { registerSchema } = require('../validations/validateUser')
const Users =require('../models/registerUser')
const userRegister =async (req, res) => {
    const { error, value } = registerSchema.validate(req.body)

    if (error) {
      
        return  res.status(400).json({ message: "validation failed", error: error })
    }
    const newUser= new Users({name:value.name,email:value.email,password:value.password})
    await newUser.save()
     console.log(await Users.find({}))
    return res.status(200).json({ message: "success register" })
}
module.exports={userRegister}