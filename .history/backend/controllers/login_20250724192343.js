const { LoginSchema } = require('../validations/validateUser')
const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')
const Users = require('../models/registerUser')
const userLogin = async(req, res) => {
    const secret=process.env.SECRET_KEY
    const { error, value } = LoginSchema.validate(req.body)
    if (error) return res.status(400).json({ message: "validation failed", error: error })
    let email=value.email

    const user = await Users.findOne({ email})
    if (!user) {
        return res.status(404).json({ message: "user Not Found" })
    }
    const isMatch = await bcrypt.compare(value.password,user.password)
    if(!isMatch)return res.status(401).json({message:"invalid credential "}) 
    const token= jwt.sign({ id : user._id} ,"rahul", {expiresIn:"1d"} )
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"Lax",
        maxAge:24*60*60*1000
    })
    return res.status(200).json({message:"user found",user,token}) 

}
module.exports = { userLogin }

