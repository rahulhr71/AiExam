const {LoginSchema}=require('../validations/validateUser')
const adminLogin=(req,res)=>{
    const {err,value}=LoginSchema.validate(req.body)
    if(value.email!==process.env.ADMIN_EMAIL || value.password!==process.env.ADMIN_PASSWORD){
        return res.status(400).json({message:"invalid credentials"})
    }

    if(err)return res.status(400).json({message:"validation error"})
    return res.status(200).json({message:"successfull login to teacher panel"})
}
module.exports=adminLogin