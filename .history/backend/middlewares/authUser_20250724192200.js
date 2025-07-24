const jwt=require('jsonwebtoken')
export const authUser=(req,res,next)=>{
    const token=req.cookie.token()
    const secret=process.env.SECRET_KEY
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try{
        const decode=jwt.verify(token,secret)
    }

}