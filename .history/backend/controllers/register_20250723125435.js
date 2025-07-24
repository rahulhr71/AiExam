const jwt =require('jsonwebtoken')
const brypt=require('bcrypt')
const {registerSchema}=require('../validations/validateUser')
export const userRegister=(req,res)=>{
     const {error,value}=registerSchema.validate(req.body)
     console.log(value)
    return res.status(200).json({message:"success register"})
}
