const jwt=require('jsonwebtoken')
const authUser=(req,res,next)=>{
    const token=req.cookies.token
    const secret=process.env.SECRET_KEY
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try{
        const decode=jwt.verify(token,secret)
        req.user=decode
        next()
    }catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
module.exports=authUser