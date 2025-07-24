const jwt =require('jsonwebtoken')
const brypt=require('bcrypt')
export const userRegister=(req,res)=>{
    
    return res.status(200).json({message:"success register"})
}
