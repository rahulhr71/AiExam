
const  { registerSchema } = require('../validations/validateUser')
const bcrypt=require('bcrypt')
const Users =require('../models/registerUser')
const userRegister =async (req, res) => {
    const { error, value } = registerSchema.validate(req.body)
    const hashPassword=async(password)=>{
        const saltround=10
        const salt= await bcrypt.genSalt(saltround)
        const hashedPassword= await bcrypt.hash(password,salt)
        return hashedPassword
    }
    if (error) {
      
        return  res.status(400).json({ message: "validation failed", error: error })
    }
    const hashPass=hashPassword(value.password)
    const newUser= new Users({name:value.name,email:value.email,password:hashPass})
    await newUser.save()
     console.log(await Users.find({}))
    return res.status(200).json({ message: "success register" })
}
module.exports={userRegister}