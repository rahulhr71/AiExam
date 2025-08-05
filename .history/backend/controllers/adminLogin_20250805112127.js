const {LoginSchema}=require('../validations/validateUser')
const adminLogin=(req,res)=>{
    const {err,value}=LoginSchema.validate(req.body)
console.log(value)
    if(err)return res.status(400).json({message:"validation error"})
    return res.status(200).json({message:"successfull login to teacher panel"})
}
module.exports=adminLogin