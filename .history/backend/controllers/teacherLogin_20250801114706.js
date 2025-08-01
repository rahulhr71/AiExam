const {LoginSchema}=require('../validations/validateUser')
const teacherLogin=(req,res)=>{
    const {err,value}=LoginSchema.validate(req.body)

    if(err)return res.status(400).json({message:"validation error"})
    
    return res.status(200).json({message:"successfull login to teacher panel"})
}